import {TestBed,ComponentFixture} from '@angular/core/testing';
import {NgxSliderMobyComponent} from './ngx-slider-moby.component';
import {Component,DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

import {elementsAlphaConfig} from './element-styles.config';

describe('Component: Ngx-slider-moby: Inputs',()=>{
	let component:NgxSliderMobyComponent;
	let fixture:ComponentFixture<NgxSliderMobyComponent>;
	let thumbLabel1:DebugElement;
	let thumbLabel2:DebugElement;

	beforeEach(()=>{
		TestBed.configureTestingModule({
			declarations:[NgxSliderMobyComponent]
		});
		fixture = TestBed.createComponent(NgxSliderMobyComponent);
		component = fixture.componentInstance;

		thumbLabel1 = fixture.debugElement.query(By.css('.ngx-slider-moby-thumb-label1'));
		thumbLabel2 = fixture.debugElement.query(By.css('.ngx-slider-moby-thumb-label2'));
	})

	it('Setting RANGE input to true makes private properties _thumbLabel1 and _thumbLabel2 true',()=>{
		component.range = true;
		component.ngOnInit();
		fixture.detectChanges();
		expect(component._thumbLabel1).toBe(true);
		expect(component._thumbLabel2).toBe(true);
	})	

	it('Setting RANGE input to false makes private property _thumbLabel2 false',()=>{
		component.range = false;
		component.ngOnInit();
		fixture.detectChanges();
		expect(component._thumbLabel2).toBe(false);
	})

	it('Setting showThumbLabels input to false assigns "hidden" attribute to DOM elements and false to inputs thumbLabel1 and thumbLabel2 ',()=>{
		component.showThumbLabels = false;
		component.ngOnInit();
		fixture.detectChanges();
		expect(thumbLabel1.properties['hidden']).toBe(true);
		expect(thumbLabel2.properties['hidden']).toBe(true);
		expect(component._thumbLabel1).toBe(false);
		expect(component._thumbLabel2).toBe(false);
	})
	
	describe('min and max values',()=>{
		it('should ignore incorrect inputs and assign default values of 0 and 500 correspondingly',()=>{
			component.min_value="I dont know whats happening";
			component.max_value="I dont know whats happening";
			component.ngOnInit();
			fixture.detectChanges();
			expect(component.min_value).toBe(0);
			expect(component.max_value).toBe(500);
		})

		it('Setting min_value and max_value input should limit value change within the range',()=>{
		component.min_value = 20;
		component.max_value = 5000;
		component.ngOnInit();
		fixture.detectChanges();
		component.value1 = 2;	
		expect(component.value1).toBe(component.min_value);
		component.value1 = 10000;
		expect(component.value1).toBe(component.max_value);
		})
	})
})

describe('Component: Ngx-slider-moby: Functions',()=>{
	let component:NgxSliderMobyComponent;
	let fixture:ComponentFixture<NgxSliderMobyComponent>;

	beforeEach(()=>{
		TestBed.configureTestingModule({
			declarations:[NgxSliderMobyComponent]
		});
		fixture = TestBed.createComponent(NgxSliderMobyComponent);
		component = fixture.componentInstance;
	})




	describe('updatePositionFromValue',()=>{
		beforeEach(()=>{
			component.ngOnInit();
		})
		it('should be called in afterViewInit hook',()=>{
			let updatePositionFromValue = spyOn(component,'updatePositionFromValue');
			component.ngAfterViewInit();
			expect(updatePositionFromValue).toHaveBeenCalled();
		})

		it('should update percent prop if called with one argument',()=>{
			let value1 = 20;
			let max = 200;
			let percent = value1/max;
			component.max_value = max;			
			component.updatePositionFromValue(value1);
			expect(component.percent).toBe(percent);
		})

		it('should reset the currentRange.from and currentRange.to if value1 > value2 or value1 == value2 ',()=>{
			let value1 = 20;
			let value2 =20;		
			let defaultRange = component.defaultCurrentRange;
			component.updatePositionFromValue(value1,value2);
			expect(component.currentRange.to).toBe(defaultRange.to);
			expect(component.currentRange.from).toBe(defaultRange.from);
			value1 = value2 +20;
			component.updatePositionFromValue(value1,value2);			
			expect(component.currentRange.to).toBe(defaultRange.to);
			expect(component.currentRange.from).toBe(defaultRange.from);
		})
		it('should set the currentRange.from and currentRange.to to correct percentage with regard to max_value if value1 < value2',()=>{
			let value1 = 20;
			let value2 =30;		
			let defaultRange = component.defaultCurrentRange;
			component.max_value = 100;
			component.updatePositionFromValue(value1,value2);
			expect(component.currentRange.to).toBe(value2/component.max_value*100);
			expect(component.currentRange.from).toBe(value1/component.max_value*100);
		})
		it('should call updateRangeStyles when supplied two arguments',()=>{
			let updateRangeStyles = spyOn(component,'updateRangeStyles');
			component.updatePositionFromValue(20,30);
			expect(updateRangeStyles).toHaveBeenCalled();
		})
	})

	describe('onFocus',()=>{
		let element;
		beforeEach(()=>{
			element = component.element;
		})
		it('should make the document to put focus on native element',()=>{
			component.onFocus();
			fixture.detectChanges();		
			let activeElement = document.activeElement;
			expect(activeElement).toBe(element);
		})	
		it('should emit focused event true',()=>{
			let focused;
			component.focused.subscribe(val=>focused = val);		
			component.onFocus();
			expect(focused).toBe(true);
		});
			it('should emit blurred event false',()=>{			
			let blurred;
			component.blurred.subscribe(val=>blurred = val);		
			component.onFocus();	
			expect(blurred).toBe(false);	
		})
	})
	describe('onBlur',()=>{
		let element;
		beforeEach(()=>{
			element = component.element;
		})
		it('should make the document to remove focus from native element',()=>{
			component.onFocus();
			fixture.detectChanges();
			component.onBlur();
			let activeElement = document.activeElement;
			expect(activeElement).not.toBe(element);

		})
	   it('should emit focused event false',()=>{
			
			let focused;
			component.focused.subscribe(val=>focused = val);	
			component.onBlur();
			expect(focused).toBe(false);
			});	
		it('should emit blurred event true',()=>{		
			let blurred;
			component.blurred.subscribe(val=>blurred = val);	
			component.onBlur();	
			expect(blurred).toBe(true);	
		
	})
})

	describe('fillTrack',()=>{
		let trackFill;

		beforeEach(()=>{
			component.ngOnInit();
			trackFill = component.trackFill;
		})

		it('should correctly fill the track width if prop vertical is false',()=>{
			component.vertical = false;
			component.fillTrack(200);
			fixture.detectChanges();
			expect(trackFill.style.width).toBe('200px');
		})
		it('should correctly fill the track height if prop vertical is true',()=>{
			component.vertical = true;
			component.fillTrack(200);
			fixture.detectChanges();
			expect(trackFill.style.height).toBe('200px');
		})
	})

	describe('initColorPallete',()=>{
		it('should create a color map object if called',()=>{
			component.initColorPallete();
			let isObject = typeof component.colorMap === 'object' && component.colorMap != null;
			expect(isObject).toBe(true);
		})
		it('should throw an error if color specificed by user in input color doesnt exist',()=>{
			component.color = 'bacon';
			let func = spyOn(component,'initColorPallete').and.callThrough();
			expect(func).toThrowError();
		})
	})

	describe('initElements',()=>{
		beforeEach(()=>{
			component = TestBed.createComponent(NgxSliderMobyComponent).componentInstance;
		})
		it('should initialize elements',()=>{
			component.initElements();
			let elements = ['mover1','mover2','track','trackFill','thumb1','thumb2','sliderThumbLabel1','sliderThumbLabel2'].map(elStr=>{
				return component[elStr];
			})
			expect(elements).not.toContain(undefined);
		})
		
	})
	describe('initRangeStyles',()=>{
		beforeEach(()=>{
			component = TestBed.createComponent(NgxSliderMobyComponent).componentInstance;
			component.initElements();
		})
		it('should set thumb2 element display style to block',()=>{
			component.initRangeStyles();
			expect(component.thumb2.style.display).toBe('block');
		})
		
	})	

	describe('applyColorPallete',()=>{
		beforeEach(()=>{
			component = TestBed.createComponent(NgxSliderMobyComponent).componentInstance;
			component.initElements();
			component.initColorPallete();
		})
		it('should call applyCssToElement for each element in the array once if alpha config is false and twice if its true',()=>{
			let applyCssFunc = spyOn(component,'applyCssToElement');
			component.applyColorPallete();
			let timesShouldBeCalled = elementsAlphaConfig.length+elementsAlphaConfig.filter(el=>Boolean(el.alpha)).length;
			expect(applyCssFunc).toHaveBeenCalledTimes(timesShouldBeCalled);
		})
		
	})

	describe('updateRangeStyles',()=>{
		beforeEach(()=>{
			component = TestBed.createComponent(NgxSliderMobyComponent).componentInstance;
			component.currentRange={from:20,to:60};
			component.ngOnInit();
		})
		it('should call applyCssToElement 1 time for thumb1 and thumb2 and 1 time for thumbLabel1 and thumbLabel2. Total 4 times',()=>{
			let applyCssToElement = spyOn(component,'applyCssToElement');
			component.updateRangeStyles();
			expect(applyCssToElement).toHaveBeenCalledTimes(4);		
		})
		it('should update DOM elements position according to calculated offsets on X axis',()=>{
			let range = component.currentRange;
			let offsetsInPercent = component.getRangeOffsetsInPercents(range.from,range.to);
			let offsetsInPixels = component.getRangeOffsetsInPixels(false,offsetsInPercent);
			
			component.updateRangeStyles(range.from,range.to);
			let thumb1 = component.thumb1;
			let thumb2 = component.thumb2;
			expect(thumb1.style.transform).toBe(`translateX(${offsetsInPixels.offsetThumb1}px)`)
			expect(thumb2.style.transform).toBe(`translateX(${offsetsInPixels.offsetThumb2}px)`)
		})
		
	})
	describe('getRangeOffsetsInPercents',()=>{
		it('should return an object',()=>{
			let returnValue = component.getRangeOffsetsInPercents(20,40);
			expect(typeof returnValue).toBe('object');		
		})
		it('should return offsetLeft as is and offsetRight as subtraction of argument [to] from 100',()=>{
			let returnValue = component.getRangeOffsetsInPercents(20,40);		
			expect(returnValue.offsetLeft).toBe(20)
			expect(returnValue.offsetRight).toBe(100-40)
		})
		
	})
	describe('getRangeOffsetsInPixels',()=>{
		let offsets;
		let from = 20;
		let to = 40;
		beforeEach(()=>{
			offsets = component.getRangeOffsetsInPercents(from,to);
			component.ngOnInit();
		})
		it('should return an object',()=>{			
			let returnValue = component.getRangeOffsetsInPixels(component.vertical,offsets);
			expect(typeof returnValue).toBe('object');		
		})
		it('should return offsetThumb1 as an integer >= 0 and offsetThumb2 as an integer <=0',()=>{
			let returnValue = component.getRangeOffsetsInPixels(component.vertical,offsets);
			expect(returnValue.offsetThumb1).toBeGreaterThanOrEqual(0);
			expect(returnValue.offsetThumb2).toBeLessThanOrEqual(0);
		})
		
	})	

	describe('updateRangeValues',()=>{
	
		let from = 20;
		let to = 40;
		beforeEach(()=>{
			component.ngOnInit();
		})
		it('should update value1 and value2 component property',()=>{			
			let value1before= component.value1;
			let value2before= component.value2;
			component.updateRangeValues(from,to);
			expect(value1before).not.toEqual(component.value1);		
			expect(value2before).not.toEqual(component.value2);		
		})
		
		
	})
	describe('getValueFromStep',()=>{
	
		let percentage = 50;
		beforeEach(()=>{
			component.ngOnInit();
		})
		it('should return a number',()=>{			
		let returnValue = component.getValueFromStep(percentage);
			expect(typeof returnValue).toBe('number');		
		})
		it('should return a number',()=>{			
		let returnValue = component.getValueFromStep(percentage);
			expect(typeof returnValue).toBe('number');		
		})
		
		
	})
	describe('initDesktopObs',()=>{
		it('should call initDefaultObs if input prop range is false',()=>{	
		component.range = false;
		let initDefaultObs = spyOn(component,'initDefaultObs');
		component.initDesktopObs();		
		expect(initDefaultObs).toHaveBeenCalled();		
		})
		it('should call initRangeObs if input prop range is true',()=>{	
		component.range = true;
		let initRangeObs = spyOn(component,'initRangeObs');
		component.initDesktopObs();		
		expect(initRangeObs).toHaveBeenCalled();		
		})
	
		
		
	})
})


describe('utilities',()=>{
	let component:NgxSliderMobyComponent;
	let fixture:ComponentFixture<NgxSliderMobyComponent>;

	beforeEach(()=>{
		TestBed.configureTestingModule({
			declarations:[NgxSliderMobyComponent]
		});
		fixture = TestBed.createComponent(NgxSliderMobyComponent);
		component = fixture.componentInstance;
		component.ngOnInit();
		component.ngAfterViewInit();
	})

	describe('clamp', ()=> {
        it('should return the number', () =>{
            expect(typeof component.clamp(5, 0, 10)).toBe('number');
        });
        it('should return max if the number is larger', ()=> {
            expect(component.clamp(20, 0, 10)).toBe(10);
        });
        it('should return min if the number is smaller', ()=> {
            expect(component.clamp(-20, 0, 10)).toBe(0);
        });
    });

    describe('applyCssToElement',()=>{
    	it('should apply css to element',()=>{
    		let testElement = component.thumb1;
    		let cssProp = 'color';
    		let cssValue ='rgb(255, 255, 255)';
    		component.applyCssToElement(testElement,cssProp,cssValue);
    		expect(testElement.style[cssProp]).toBe(cssValue);
    	})
    })
})