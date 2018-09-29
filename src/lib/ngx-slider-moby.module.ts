import { NgModule } from '@angular/core';
import { NgxSliderMobyComponent } from './ngx-slider-moby.component';
import {NgxSliderTrack} from './cdk/ngx-slider-track';
import {NgxTrackFiller} from './cdk/ngx-slider-track';
import {NgxSliderThumbLabel} from './cdk/ngx-slider-thumb-label';
import {NgxSliderThumbContainer} from './cdk/ngx-slider-thumb-container';
import {NgxSliderThumbHandle} from './cdk/ngx-slider-thumb-handle';
import { CommonModule } from '@angular/common';

const DIRECTIVES = [
NgxSliderTrack,NgxTrackFiller,
NgxSliderThumbContainer,NgxSliderThumbLabel,NgxSliderThumbHandle
];
const COMPONENTS = [NgxSliderMobyComponent];

@NgModule({
  imports: [CommonModule
  ],
  declarations: [...COMPONENTS,...DIRECTIVES],
  exports: [...COMPONENTS,...DIRECTIVES]
})
export class NgxSliderMobyModule { }
