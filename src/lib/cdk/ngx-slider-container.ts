import {Directive,ElementRef} from '@angular/core';


@Directive({
	selector:'[ngxSliderContainer]',
	exportAs:'ngxSliderContainer'
})

export class NgxSliderContainer{

	constructor(private _el:ElementRef){

	}

	getSliderContainerDims():ClientRect{
		let dims;
		dims = this._el.nativeElement.getBoundingClientRect();
		return dims;
	}
}