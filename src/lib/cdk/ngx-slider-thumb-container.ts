import {Component,ContentChild,Input,TemplateRef,AfterContentInit,OnChanges} from '@angular/core';
import {NgxSliderThumbHandle} from './ngx-slider-thumb-handle';
import {NgxSliderThumbLabel} from './ngx-slider-thumb-label';

@Component({
	selector:'[ngxSliderThumbContainer]',
	template:'<ng-content></ng-content>'
})

export class NgxSliderThumbContainer implements AfterContentInit,OnChanges{
@Input('ngxSliderThumbContainer') value;
@ContentChild(NgxSliderThumbHandle) thumbHandle:NgxSliderThumbHandle;
@ContentChild(NgxSliderThumbLabel) thumbLabel:NgxSliderThumbLabel;

showLabel:boolean = true;

	constructor(){

	}



	toggleThumblabel(val:boolean):void{
		this.showLabel = !this.showLabel;
		this.thumbLabel.showOrHide(this.showLabel);
	}

ngOnChanges(changes){
	if(this.thumbLabel){
		this.thumbLabel.changeValue(this.value);
	}
}

}