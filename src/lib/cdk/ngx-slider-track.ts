import {Directive,Input,Renderer2,
	ElementRef,OnChanges,OnInit,OnDestroy,
TemplateRef,ViewContainerRef,ContentChild} from '@angular/core';
import {Observable,BehaviorSubject,timer,of,fromEvent,Subscription} from 'rxjs';
import {tap,map,merge,takeUntil,mergeMap,take,
  throttleTime,delay,switchMap,mapTo,filter} from 'rxjs/operators';

import {NgxSliderMobyComponent} from '../ngx-slider-moby.component';

@Directive({
	selector:'[ngxTrackFiller]',
	exportAs:'ngxTrackFiller'
})
export class NgxTrackFiller {}

@Directive({
	selector:'[ngxSliderTrack]',
	exportAs:'ngxSliderTrack'
})

export class NgxSliderTrack implements OnChanges,OnInit,OnDestroy{

clickSub:Subscription;
@Input('ngxSliderTrack') percentage:number;
@ContentChild(NgxTrackFiller,{read:ElementRef}) _trackFiller:ElementRef;

private _initialized:boolean = false;
	constructor(private renderer:Renderer2,public slider:NgxSliderMobyComponent,private _el:ElementRef){
		
	}

ngOnChanges(changes){
	if(this._trackFiller){	
		this.fillTrack(this.percentage*100);
	}
	
}

ngOnInit(){
	this.clickSub = fromEvent(this._el.nativeElement,'click').pipe(
		tap(val=>{this.slider.onTrackClick(of(val))}))
		.subscribe();
}

ngOnDestroy(){
	this.clickSub.unsubscribe();
}


fillTrack(percentage:number):void{
	let toFill = this.slider.vertical ? 'height' : 'width';
	this.renderer.setStyle(this._trackFiller.nativeElement,toFill,percentage+'%');
}
}