import {Directive,OnInit,OnDestroy,ElementRef} from '@angular/core';
import {Observable,BehaviorSubject,timer,of,fromEvent,Subscription} from 'rxjs';
import {tap,map,merge,takeUntil,mergeMap,take,
  throttleTime,delay,switchMap,mapTo,filter} from 'rxjs/operators';

@Directive({
	selector:'[ngxSliderThumbHandle]',
	exportAs:'ngxSliderThumbHandle'
})

export class NgxSliderThumbHandle implements OnInit,OnDestroy{
subs:Subscription[] = [];
	constructor(private _el:ElementRef){

	}

ngOnInit(){
	let host = this._el.nativeElement;
	let onmousedown = fromEvent(host,'mousedown').pipe(tap(val=>{
  // this.isActive = true;
  // this.isSliding = true;
})).subscribe();
	let onmousemove= fromEvent(host,'mousemove')
  .pipe(takeUntil(onmouseup),delay(75),
  	//tap(val=>this.updateSlider.next({type:'range',event:val}))
  	);
}

ngOnDestroy(){
	
}
}