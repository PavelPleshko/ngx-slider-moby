import {Directive,TemplateRef,ViewContainerRef} from '@angular/core';


@Directive({
	selector:'[ngxSliderThumbLabel]',
	exportAs:'ngxSliderThumbLabel'
})

export class NgxSliderThumbLabel{
value;
	constructor(private _tRef:TemplateRef<any>,private _vcRef:ViewContainerRef){
	}

	showOrHide(show:boolean){
		if(show){
			this._vcRef.createEmbeddedView(this._tRef,{$implicit:this.value});
		}else{
			this._vcRef.clear();
		}
	}
changeValue(val){
	this.value = val;
}
	
}