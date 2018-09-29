import {
 Directive,
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
  Renderer,AfterViewInit,
  ContentChild,ContentChildren,
  QueryList
} from '@angular/core';
import {UP_ARROW,DOWN_ARROW,RIGHT_ARROW,LEFT_ARROW} from './keycodes';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {Observable,BehaviorSubject,Subject,timer,fromEvent,Subscription} from 'rxjs';
import {tap,map,merge,takeUntil,mergeMap,take,
  throttleTime,delay,switchMap,mapTo,filter,repeat} from 'rxjs/operators';
import {elementsAlphaConfig,IElementWithAlpha} from './element-styles.config';
import {colors} from './colors';
import {NgxSliderContainer} from './ngx-slider-container';
import {NgxSliderThumbContainer} from './ngx-slider-thumb-container';

let sliderId = 0;
export interface IUpdateOperation{
  type:string,
  event:object
}

@Directive({
  selector: '[cdkNgxSlider]',
  exportAs: 'cdkNgxSlider'
})

export class CdkNgxSlider implements OnInit,OnDestroy,AfterViewInit  {

@ContentChild(NgxSliderContainer) sliderContainer:NgxSliderContainer;
@ContentChildren(NgxSliderThumbContainer) sliderThumbs:QueryList<NgxSliderThumbContainer>;

protected _destroyed = new Subject<void>();
protected timer:BehaviorSubject<any>=new BehaviorSubject(null);
protected pressed:number;
currentRange:{from:number,to:number} = {from:0,to:0};
defaultCurrentRange:any = {from:50,to:70};
protected isMobileDevice:boolean;
protected uniqueId:string;
colorMap:any;
isActive:boolean = false;
isSliding:boolean = false;
stepDistance:number;
//listeners

//mobile observables
mobileSubscriptions:Subscription[] = [];
touchEvent:any;
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
element:any; //main
thumb1:NgxSliderThumbContainer;
thumb2:NgxSliderThumbContainer;
track:HTMLElement;
sliderThumbLabel1:HTMLElement;
sliderThumbLabel2:HTMLElement;
trackFill:HTMLElement;
mover1:HTMLElement;
mover2:HTMLElement;
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
@Input() color:string = 'purple';

@Input()
 @HostBinding('class.ngx-banner-slider-disabled')
 @HostBinding('attr.aria-disabled')
get disabled(){
  return this._disabled;
}
set disabled(val:boolean){
 
    this._disabled = val;
}
private _disabled:boolean = false;

get thumbLabel1(){
  return this._thumbLabel1;
}
set thumbLabel1(val:boolean){
   if(this.showThumbLabels){
      this._thumbLabel1 = val;
      this.thumb1.toggleThumblabel(val);  
   }   
}
private _thumbLabel1:boolean = false;


get thumbLabel2(){
  return this._thumbLabel2;
}
set thumbLabel2(val:boolean){
   if(this.showThumbLabels){
    this._thumbLabel2 = val;
    this.thumb2.toggleThumblabel(val);
   }
 }
private _thumbLabel2:boolean = false;

@Input()
get min_value(){
  return this._min_value || 0;
}
set min_value(val:any){
    val = Number(val);
    if(typeof val !== 'number'){
      val = 0;
    }
    this._min_value = Number(val);
}
private _min_value:number;

@Input()
get max_value(){
  return this._max_value || 100;
}
set max_value(val:any){
    this._max_value = Number(val);
}
private _max_value:number;


@Input('value_from')
get value1(){
  return this._value1 || 0;
}
set value1(val:any){
  if(val != this._value1){
    this._value1 = Number(this.clamp(val,this.min_value,this.max_value));
    if(this.range){
      this._controlValueAccessorChangeFn({from:val,to:this.value2})
    }else{
      this._controlValueAccessorChangeFn(val);
    }
  }
   this.cdr.detectChanges();

}
private _value1:number;

@Input('value_to')
get value2(){
  return this._value2 || 0;
}
set value2(val:any){
  if(val != this._value2){
    this._value2 = Number(this.clamp(val,this.min_value,this.max_value));
     if(this.range){
      this._controlValueAccessorChangeFn({from:this.value1,to:val})
    }else{
      this._controlValueAccessorChangeFn(val);
    }
  }
   this.cdr.detectChanges();
}
private _value2:number;


get percent(){
  return this._percent;
}
set percent(val:any){
   val = Math.max(Math.min((Number(val) || 0 ),1),0);
    this._percent = val;
}
private _percent:number;
_sliderId: number;
_uniqueId:string;

constructor(private renderer:Renderer,private cdr:ChangeDetectorRef,
  private elementRef?:ElementRef){
    this._sliderId = sliderId++;
    this.uniqueId = this.getUniqueId();
    this.element = elementRef.nativeElement;
}

ngOnInit(){
   this.getCurrentSliderDimensions();
}


ngAfterViewInit(){
   this.getCurrentSliderDimensions();
}

getCurrentSliderDimensions(){
  this.currentDimensions = this.sliderContainer.getSliderContainerDims();
}

getUniqueId(){
  return `moby-slider-${this._sliderId}`;
}

init(){
  this.initColorPallete();
  this.initElements();
 // this.applyColorPallete();
  this.updateSlider = new BehaviorSubject<IUpdateOperation | any>(null);
  let update = this.updateSlider.pipe(tap(val=>this.updatePosition(val))).subscribe();
  this.timer$ = this.timer.pipe(switchMap(val=>timer(800).pipe(tap((val)=>{
  this.toggleThumbLabel();
  if(this.isMobileDevice){
    this.isActive = false;
  }
  this.cdr.detectChanges();
  }))));
  this.commonSubscriptions.push(update);
}

initColorPallete():void{
  let colorConfig = colors as any;
  this.colorMap=colorConfig[this.color];
  if(!this.colorMap){
    throw Error('Provided color doesn\'t exist in available colors. Check the documentation please.')
  }
}

initElements():void{
  this.track = this.element.querySelector('.ngx-slider-moby-track-container');
  this.trackFill = this.element.querySelector('.ngx-slider-moby-track-fill');
  let sliderThumbs = this.sliderThumbs.toArray();
  this.thumb1 = sliderThumbs[0];
  this.thumb2 = sliderThumbs[1];
  this.thumb1.createElement();
  if(this.range){
    this.thumb2.createElement();
    this.toggleThumbLabel(true,true);
    this.cdr.detectChanges();
  }
}

toggleThumbLabel(value?:boolean,both?:boolean){
  if(both && typeof value != 'undefined'){
    return this.thumbLabel1 = this.thumbLabel2 = value;
  }
  if(!this.range){
     this.thumbLabel1 ? this.thumbLabel1 = false : this.thumbLabel1 = true;
    }
}


  }