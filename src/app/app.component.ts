import { Component } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form:FormGroup = this.fb.group({
  	'range':[null],
  	'default':[null]
  })


  constructor(private fb:FormBuilder){
  	this.form.valueChanges.subscribe(val=>console.log(val));
  }

  logValue($event){
  	console.log($event);
  }
}
