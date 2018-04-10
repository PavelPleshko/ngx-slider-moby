import {
 Component,
  ElementRef,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer,AfterViewInit
} from '@angular/core';
import {UP_ARROW,DOWN_ARROW,RIGHT_ARROW,LEFT_ARROW} from './keycodes';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {tap,map,merge,takeUntil,mergeMap,take,
  throttleTime,delay,switchMap,mapTo,filter,repeat} from 'rxjs/operators';
import {timer} from 'rxjs/observable/timer';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {Subscription} from 'rxjs/Subscription';
import {colors} from './colors';
import {styles} from './ngx-slider-moby-styles';
import 'hammerjs';

export var sliderId = 0;
const MIN_AUTO_TICK_SEPARATION = 30;

export const MD_SLIDER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxSliderMobyComponent),
  multi: true
};
export interface IUpdateOperation{
  type:string,
  event:object
}


@Component({
  selector: 'ngx-slider-moby',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MD_SLIDER_VALUE_ACCESSOR],
  styles:[styles],
  host: {
    'tabindex': '0',
    'class':'slider-main',
    '(blur)': 'onBlur()',
    '(focus)':'onFocus()',
    '(window:resize)':'onResize($event)'
  },
  template:`
  <div class="ngx-slider-moby-wrapper">
    <div class="ngx-slider-moby-container"
       [class.ngx-slider-moby-sliding]="isSliding && isActive"
       [class.ngx-slider-moby-active]="isActive"
       [ngClass]="{'ngx-slider-moby-thumb-label-show1':thumbLabel1,'ngx-slider-moby-thumb-label-show2':thumbLabel2}">
      <div class="ngx-slider-moby-track-container">
        <div class="ngx-slider-moby-track"></div>
        <div class="ngx-slider-moby-track ngx-slider-moby-track-fill"></div>
        <div class="ngx-slider-moby-tick-container"></div>
        <div class="ngx-slider-moby-last-tick-container"></div>
      </div>
      <div class="ngx-slider-moby-thumb-container1">
        <div class="ngx-slider-moby-thumb-position1">
          <div class="ngx-slider-moby-thumb1" id="thumb_handle-1"></div>
          <div class="ngx-slider-moby-thumb-label1" [hidden]="!thumbLabel1">
            <span class="ngx-slider-moby-thumb-label-text1">{{ value1 }}</span>
          </div>
        </div>
      </div>
        <div class="ngx-slider-moby-thumb-container2">
        <div class="ngx-slider-moby-thumb-position2">
          <div class="ngx-slider-moby-thumb2" id="thumb_handle-2"></div>
          <div class="ngx-slider-moby-thumb-label2" [hidden]="!thumbLabel2">
            <span class="ngx-slider-moby-thumb-label-text2">{{ value2 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})


export class NgxSliderMobyComponent implements OnInit,OnDestroy,ControlValueAccessor,AfterViewInit  {

private timer:BehaviorSubject<any>=new BehaviorSubject(null);
private pressed:number;
private currentRange:any = {from:50,to:70};
private isMobileDevice:boolean;
private uniqueId:string;
private colorMap:any;
isActive:boolean = false;
isSliding:boolean = false;
stepDistance:number;
//listeners

//mobile observables
mobileSubscriptions:Subscription[] = [];
touchEvent;
onTap:Observable<any>;
onTouchStart1:Observable<any>;
onTouchStart2:Observable<any>;
//desktop observables
subscriptions:Subscription[]=[];
onClick:Observable<any>;
onMouseDown1:Observable<any>;
onMouseDown2:Observable<any>;
//common observables
commonSubscriptions:Subscription[]=[];
timer$:Observable<any>;
//listeners end
//elements
element; //main
thumb1:HTMLElement;
thumb2:HTMLElement;
track:HTMLElement;
sliderThumbLabel1:HTMLElement;
sliderThumbLabel2:HTMLElement;
trackFill:HTMLElement;
//elements end

//output events
@Output() blurred:EventEmitter<boolean> = new EventEmitter<boolean>();
@Output() focused:EventEmitter<boolean> = new EventEmitter<boolean>();
@Output() valueChange: EventEmitter<{ sliderId:string,value: any,percent:any }> = new EventEmitter<{ sliderId:string,value: any,percent:any }>(false);
//output events end

//value accessor
_controlValueAccessorChangeFn:(value: any) => void = (value) => {};
 onTouched: () => any = () => {};
value:any;
//value accessor end
updateSlider:BehaviorSubject<IUpdateOperation>;
currentDimensions:ClientRect;

@Input() identificator:string;
@Input() range:boolean = true;
@Input() min_distance:number=20;
@Input() showThumbLabels:boolean = true;
@Input() readonly step:number = 1;
@Input() readonly direction:'ltr' | 'rtl' = 'ltr';
@Input() readonly color:string = 'purple';

@Input()
 @HostBinding('class.ngx-banner-slider-disabled')
 @HostBinding('attr.aria-disabled')
get disabled(){
  return this._disabled;
}
set disabled(val:boolean){
 
    this._disabled = val;
}
_disabled:boolean = false;

@Input()
get vertical(){
  return this._vertical;
}
set vertical(val:boolean){
  if(val){
    this.element.classList.add('ngx-banner-slider-vertical');
  }
  this._vertical = val;
}
_vertical:boolean = false;

get thumbLabel1(){
  return this._thumbLabel1;
}
set thumbLabel1(val:boolean){
   if(this.showThumbLabels){
      this._thumbLabel1 = val;  
   }   
}
_thumbLabel1:boolean = false;


get thumbLabel2(){
  return this._thumbLabel2;
}
set thumbLabel2(val:boolean){
   if(this.showThumbLabels){
    this._thumbLabel2 = val;
   }
 }
_thumbLabel2:boolean = false;


@Input('value_from')
get value1(){
  return this._value1 || 0;
}
set value1(val:any){
  if(val != this._value1){
    this._value1 = Number(this.limit(val));
    if(this.range){
      this._controlValueAccessorChangeFn({from:val,to:this.value2})
    }else{
      this._controlValueAccessorChangeFn(val);
    }
  }
   this.cdr.detectChanges();

}
_value1:number;

@Input('value_to')
get value2(){
  return this._value2 || 0;
}
set value2(val:any){
  if(val != this._value2){
    this._value2 = Number(this.limit(val));
     if(this.range){
      this._controlValueAccessorChangeFn({from:this.value1,to:val})
    }else{
      this._controlValueAccessorChangeFn(val);
    }
  }
   this.cdr.detectChanges();
}
_value2:number;

@Input()
get min_value(){
  return this._min_value || 0;
}
set min_value(val:any){
    this._min_value = Number(val);
}
_min_value:number;

@Input()
get max_value(){
  return this._max_value || 500;
}
set max_value(val:any){
    this._max_value = Number(val);
}
_max_value:number;


get percent(){
  return this._percent;
}
set percent(val:any){
   val = Math.max(Math.min((Number(val) || 0 ),1),0);
    this._percent = val;
}
_percent:number;

constructor(private elementRef:ElementRef,private renderer:Renderer,private cdr:ChangeDetectorRef){
this.element = elementRef.nativeElement;
}

ngOnInit(){
  ++sliderId;
  this.uniqueId = `slider-${sliderId}`;
   this.getCurrentSliderDimensions();
  this.init(); 
  this.onResize();
}

ngAfterViewInit(){
    this.getCurrentSliderDimensions();

}
onBlur(){
 this.isActive = false;
    this.onTouched();
    this.element.blur();
    this.focused.next(false);
  this.blurred.next(true);
  this.cdr.detectChanges();
}

onFocus(){
  this.isActive = true;
  this.onTouched();
  this.element.focus();
  this.focused.next(true);
  this.blurred.next(false);
  this.cdr.detectChanges();
}

updatePosition(position){
 this.cdr.detach();//changes will be detected once we set a value
  let axis:string = this.vertical ? 'Y' : 'X';
  let size = axis == 'Y' ? this.currentDimensions.height : this.currentDimensions.width;
  let offset = axis == 'Y' ? this.currentDimensions.top : this.currentDimensions.left;
if(position && position.type == 'single'){
  let clientPosition = axis == 'Y' ? position.event.clientY : position.event.clientX;
let allowed = offset + size;
if(clientPosition > allowed){
  clientPosition = allowed;
}
let whereTo = Math.max(((clientPosition-offset)),0);
this.percent = (whereTo/size);
let percentage;
if(this.isSliding){
  this.updateValueFromPercentage();
  percentage = whereTo;
  this.fillTrack(percentage);
  this.applyCssToElement(this.sliderThumbLabel1,'transform',`scale(1) translate${axis}(${whereTo}px)`);
  this.applyCssToElement(this.thumb1,'transform',`translate${axis}(${whereTo}px)`);

  this.valueChange.emit({ sliderId:this.uniqueId,value: this.value1,percent:+(this.percent*100).toFixed(0)});
}
}else if(position && position.type == 'range' && this.isSliding){
  let clientPosition = axis == 'Y' ? position.event.clientY : position.event.clientX;
  
let start,end;
start = this.pressed == 1 ? 'from' : 'to';
end = this.pressed == 2 ? 'to' : 'from';
let whereTo =  Math.max(Math.round((clientPosition-offset)),0);
this.currentRange[start] = Number((((whereTo/size))*100));
let difference =Math.max(this.currentRange.to,this.currentRange.from)-Math.min(this.currentRange.to,this.currentRange.from);
 if(difference<this.min_distance){
   end == 'from' ? (this.currentRange.to +=(this.min_distance-difference)) : (this.currentRange.from -=(this.min_distance-difference));
    
    if(this.currentRange.to>100){
      this.currentRange.to=100;
      return;
    }
     if(this.currentRange.from<0){
      this.currentRange.from=0;
      return;
    }
  }
  this.updateRangeStyles(this.currentRange.from,this.currentRange.to);
   this.valueChange.emit({ sliderId:this.uniqueId,value: {from:this.value1,to:this.value2},
       percent:{from:this.currentRange.from,to:this.currentRange.to > 100 ? 100 : this.currentRange.to}});
}  
}

fillTrack(percentage){
  let whatToFill = this.vertical ? 'height' : 'width';
  this.renderer.setElementStyle(this.trackFill,whatToFill,`${percentage}px`);
}

updateValueFromPercentage(){
   let exactValue = Number((this.max_value*this.percent).toFixed(0));
   let closestValue = Math.round((exactValue - this.min_value) / this.step) * this.step + this.min_value;
   this.value1 = closestValue;
}

getCurrentSliderDimensions(){
  let element:HTMLElement = this.element.querySelector('.ngx-slider-moby-container');
  this.currentDimensions = element.getBoundingClientRect();
}

init(){
  this.initColorPallete();
  this.initElements();
  this.applyColorPallete();
this.updateSlider = new BehaviorSubject<IUpdateOperation>(null);
let update = this.updateSlider.pipe(tap(val=>this.updatePosition(val))).subscribe();
this.timer$ = this.timer.pipe(switchMap(val=>timer(800).pipe(tap((val)=>{
  this.toggleThumbLabel(val);
  if(this.isMobileDevice){
    this.isActive = false;
  }
  this.cdr.detectChanges();
}))));
this.commonSubscriptions.push(update);
}

initElements():void{
  this.track = this.element.querySelector('.ngx-slider-moby-track-container');
  this.trackFill = this.element.querySelector('.ngx-slider-moby-track-fill');
  this.thumb1 = this.element.querySelector('.ngx-slider-moby-thumb1');
  this.sliderThumbLabel1 = this.element.querySelector('.ngx-slider-moby-thumb-label1');
  this.thumb2 = this.element.querySelector('.ngx-slider-moby-thumb2');
  this.sliderThumbLabel2 = this.element.querySelector('.ngx-slider-moby-thumb-label2');
  if(this.range){
    this.initRangeStyles();
    this.thumbLabel2=true;
    this.thumbLabel1=true;
    this.cdr.detectChanges();
  }
}

initColorPallete():void{
this.colorMap=colors[this.color];
}

applyColorPallete():void{
  let elements = [{element:this.thumb1,alpha:false},{element:this.thumb2,alpha:false},{element:this.sliderThumbLabel1,alpha:true},
  {element:this.sliderThumbLabel2,alpha:true},{element:this.trackFill,alpha:false}];
  elements.forEach((element)=>{
    if(element.alpha){
       this.applyCssToElement(element.element,'background-color',this.colorMap.colorRgba);
       this.applyCssToElement(element.element,'border-color',this.colorMap.colorRgba);
    }else{
       this.applyCssToElement(element.element,'background-color',this.colorMap.colorRgb);
    }
    

  })
 
}

initRangeStyles(){
  this.renderer.setElementStyle(this.thumb2,'display','block');
  this.updateRangeStyles();
}

updateRangeStyles(from = this.currentRange.from,to = this.currentRange.to){
  to = to > 100 ? 100 : to;
  let y = to-from;
  let offsetLeft = from;
  let offsetRight = 100-to;
  
  let axis = this.vertical ? 'Y' : 'X';
  let size = this.vertical ? this.currentDimensions.height : this.currentDimensions.width;
  let offsetThumb1 = (size * (offsetLeft/100)).toFixed(0);
  let offsetThumb2 = (size * (offsetRight/100)).toFixed(0);
 
  this.applyCssToElement(this.thumb1,'transform',`translate${axis}(${offsetThumb1}px`);
  this.applyCssToElement(this.sliderThumbLabel1,'transform',`translate${axis}(${offsetThumb1}px`);
  this.applyCssToElement(this.thumb2,'transform',`translate${axis}(-${offsetThumb2}px`);
  this.applyCssToElement(this.sliderThumbLabel2,'transform',`translate${axis}(-${offsetThumb2}px`);
  this.updateRangeValues(from,to); 
}

updateRangeValues(from,to){
  from = from/100;
  to=to/100;
  this.value1 = Math.round(this.max_value*from);
  this.value2 = Math.round(this.max_value*to);
}

initDesktopObs(){
  if(!this.range){
    this.initDefaultObs();
  }else{
    this.initRangeObs();
  }
}

initRangeObs(){
  let onmouseup = fromEvent(document,'mouseup').pipe(tap(val=>{
  this.isSliding = false;
}),mapTo(this.pressed),switchMap(val=>this.timer$));
let onmousedown1 = fromEvent(this.thumb1,'mousedown').pipe(tap(val=>{
  this.pressed = 1;
  this.isActive = true;
  this.isSliding = true;
}));
let onmousedown2 = fromEvent(this.thumb2,'mousedown').pipe(tap(val=>{
  this.pressed = 2;
  this.isActive = true;
  this.isSliding = true;
}));
let onmousemove= fromEvent(this.element,'mousemove')
  .pipe(takeUntil(onmouseup),delay(75),tap(val=>this.updateSlider.next({type:'range',event:val})));
 let onmousedownsub1 =  onmousedown1.pipe(mergeMap(value=>onmousemove)).subscribe();
 let onmousedownsub2 =  onmousedown2.pipe(mergeMap(value=>onmousemove)).subscribe();
 this.subscriptions.push(onmousedownsub2,onmousedownsub2);
}

initDefaultObs(){
  let onclick = fromEvent(this.track,'click').pipe(tap(val=>{
     this.element.focus();
     this.isSliding=true;
    this.updateSlider.next({type:'single',event:val});
     this.toggleThumbLabel(1);
    this.cdr.detectChanges();
   }),mapTo(1),switchMap(val=>this.timer$));

let onmouseup = fromEvent(document,'mouseup').pipe(tap(val=>{
  this.isSliding=false;
}),mapTo(this.pressed),switchMap(val=>this.timer$));

let onmousedown = fromEvent(this.thumb1,'mousedown').pipe(tap(val=>{
  this.pressed = 1;
  this.toggleThumbLabel(this.pressed);
  this.isSliding=true;
  this.isActive = true;
}));

let keyup = fromEvent(this.element,'keyup').pipe(tap(val=>{
  this.isSliding = false;
}),mapTo(1),switchMap(val=>this.timer$));

let keydown = fromEvent(this.element,'keydown').pipe(filter((event:KeyboardEvent)=>{
  return [RIGHT_ARROW,LEFT_ARROW,UP_ARROW,DOWN_ARROW].some(keycode=>keycode == event.which);
}),throttleTime(100),map(event=>event.which),tap(val=>{
  this.thumbLabel1 = true; //we can't toggle here,bcs keydown supposes label is always visible
  this.isSliding = true;
  this.isActive = true;
  this.handleKeydowns(val);
  this.cdr.detectChanges();
}),takeUntil(keyup),repeat()).subscribe();


  let onmousemove= fromEvent(document,'mousemove')
  .pipe(takeUntil(onmouseup),throttleTime(200),tap(val=>this.updateSlider.next({type:'single',event:val})));
 let onmousedownsub =  onmousedown.pipe(mergeMap(value=>onmousemove)).subscribe();
 let onclicksub = onclick.subscribe();
 this.subscriptions.push(onclicksub,onmousedownsub);
}

//mobile section
initMobileObs(){
  if(!this.range){
    this.initMobileDefaultObs();
  }else{
    this.initMobileRangeObs();
  }
}

initMobileDefaultObs(){
  let ontouchend = fromEvent(document,'touchend').pipe(tap(val=>{
  this.toggleStates();
}),mapTo(this.pressed),switchMap(val=>this.timer$));

let ontouchstart = fromEvent(this.thumb1,'touchstart').pipe(tap(val=>{
  this.pressed = 1;
  this.toggleThumbLabel(this.pressed);
  this.toggleStates();
}));

let ontouchmove= fromEvent(document,'touchmove')
  .pipe(takeUntil(ontouchend),throttleTime(200),
    map((event:any)=>({clientX:event.touches[0].clientX,clientY:event.touches[0].clientY})),
    tap(val=>this.updateSlider.next({type:'single',event:val})));
 let ontouchstartsub =  ontouchstart.pipe(mergeMap(value=>ontouchmove)).subscribe();
  this.mobileSubscriptions.push(ontouchstartsub);
}

initMobileRangeObs(){
  let ontouchend = fromEvent(document,'touchend').pipe(tap(val=>{

   this.isActive = false;
  this.isSliding = false;
}),mapTo(this.pressed),switchMap(val=>this.timer$));

let ontouchstart1 = fromEvent(this.thumb1,'touchstart').pipe(tap(val=>{
  this.pressed = 1;
  this.toggleThumbLabel(this.pressed);
  this.isActive = true;
  this.isSliding = true;
}));
let ontouchstart2 = fromEvent(this.thumb2,'touchstart').pipe(tap(val=>{
  this.pressed = 2;
  this.toggleThumbLabel(this.pressed);
  this.isActive = true;
  this.isSliding = true;
}));
let ontouchmove= fromEvent(document,'touchmove')
  .pipe(takeUntil(ontouchend),delay(350),
    map((event:any)=>({clientX:event.touches[0].clientX,clientY:event.touches[0].clientY})),
    tap(val=>this.updateSlider.next({type:'range',event:val})));
 let ontouchstartsub1 =  ontouchstart1.pipe(mergeMap(value=>ontouchmove)).subscribe();
  let ontouchstartsub2 =  ontouchstart2.pipe(mergeMap(value=>ontouchmove)).subscribe();
  this.mobileSubscriptions.push(ontouchstartsub1,ontouchstartsub2);
}

onResize(){
  this.getCurrentSliderDimensions();
  this.calculateStepDistance();
  this.clearAllObservables();
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Mobile|Opera Mini/i.test(navigator.userAgent)) {
   this.isMobileDevice = true;
   this.initMobileObs();
}else{
  this.isMobileDevice = false;
  this.initDesktopObs();
}
}

//value accessor
  registerOnChange(fn: (value: any) => void): void {
    this._controlValueAccessorChangeFn = fn;
  }

   registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    if(this.value != value){
     this.value = value
  }
}

 setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

//key controls
onKeyUp(event){
  this.toggleStates();
}

handleKeydowns(key:number){
 if(!this.range){
   let distance;
     this.toggleStates();
  switch (key) {
    case LEFT_ARROW:
    case UP_ARROW:
      distance = this.direction == 'ltr' ? this.decrement() : this.increment()
      break;
    case RIGHT_ARROW:
    case DOWN_ARROW:
       distance = this.direction == 'ltr' ? this.increment() : this.decrement()
    break;
  }
      let percentage = this.percent*100;
      this.fillTrack(percentage);
      let axis = this.vertical ? 'Y' : 'X';
      this.applyCssToElement(this.thumb1,'transform',`translate${axis}(${distance}px)`);
      this.applyCssToElement(this.sliderThumbLabel1,'transform',`translate${axis}(${distance}px)`);
 }
}

increment(){
this.percent += this.stepDistance;
let size = this.vertical ? this.currentDimensions.height : this.currentDimensions.width;
let distance = size*this.percent;
this.value1 +=this.step;
return distance;

}

decrement(){
this.percent -=this.stepDistance;
let size = this.vertical ? this.currentDimensions.height : this.currentDimensions.width;
let distance = size*this.percent;
this.value1 -=this.step;
return distance;
}

//helpers
limit(val){
return Math.max((val > this.max_value ? this.max_value : val),this.min_value);
}

applyCssToElement(element,styleName,value){
  this.renderer.setElementStyle(element,styleName,value);
}

calculateStepDistance(){
  this.stepDistance =  this.step/this.max_value;
}

clearAllObservables(){
  this.mobileSubscriptions.forEach(sub=>sub.unsubscribe());
  this.subscriptions.forEach(sub=>sub.unsubscribe());
}

toggleIsSliding(){
  this.isSliding = !this.isSliding;
}

toggleThumbLabel(which?:number){
  if(!this.range){
 this.thumbLabel1 ? this.thumbLabel1 = false : this.thumbLabel1 = true;
    }
}

toggleStates(){
  this.toggleIsSliding();
  this.isActive = true;
}

ngOnDestroy(){
  this.subscriptions.forEach(sub=>sub.unsubscribe());
  this.mobileSubscriptions.forEach(sub=>sub.unsubscribe());
  this.commonSubscriptions.forEach(sub=>sub.unsubscribe());
}

}