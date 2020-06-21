import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {


  breeds : any = [
    {'name':'Labrador'},
    {'name':'Border-Collie'},
    {'name':'Posso botar varias raças'},
  ]

  activities : any = [
    {'name':'Pouco Ativo'},
    {'name':'Normalmente Ativo'},
    {'name':'Hyper Ativo'},
  ]

  eating_styles : any = [
    {'name':'Come Devagar'},
    {'name':'Come Rápido'},
    {'name':'Doido de pedra'},
  ]


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      age: ['', Validators.required],
      weight: ['', Validators.required],
      breed: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      ideal_weight: ['', Validators.required],
      activity: ['', Validators.required],
      eating_style: ['', Validators.required],
    });
  
  
  }

  testClick(){
    console.log(this.secondFormGroup.value)
  }
  
}
