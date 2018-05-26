import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxSliderMobyModule} from './ngx-slider-moby/ngx-slider-moby.module';
import {ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,NgxSliderMobyModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
