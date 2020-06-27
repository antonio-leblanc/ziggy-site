import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FoodCalcService } from '../food-calc.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {


  constructor(private _formBuilder: FormBuilder, private foodCalc: FoodCalcService) {}

  breeds = this.foodCalc.getBreeds() 
  foodTable = this.foodCalc.getCalories()
    
  activities : any = [
    {name:'Pouco Ativo', value:'inactive'},
    {name:'Ativo', value:'active'},
    {name:'Muito Ativo', value:'extra_active'},
  ]

  weight_ranges : any = [
    {'name':'Abaixo de peso'},
    {'name':'Com o peso ideal'},
    {'name':'Acima do peso'},
  ]

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fithFormGroup: FormGroup;

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      name: ['Junior', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      age: ['5', Validators.required],
      breed: ['Labrador', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      weight: ['12', Validators.required],
      weight_range: ['', Validators.required],
      ideal_weight: ['', Validators.required],
    });
    
    this.fourthFormGroup = this._formBuilder.group({
      activity: ['', Validators.required],
    });
    
    this.fithFormGroup = this._formBuilder.group({
      illness: ['', Validators.required],
      special_case: ['', Validators.required],
    });
   
  }

  calculatePlan(){
    console.log(this.secondFormGroup.value)
    var all_weights = this.foodTable.map(item => parseFloat(item.weight_kg) );
    var dog_weight = this.secondFormGroup.value.weight

    var closest = all_weights.reduce(function(prev, curr) {
      return (Math.abs(curr - dog_weight) < Math.abs(prev - dog_weight) ? curr : prev);
    });

    var dog_activity = this.thirdFormGroup.value.activity
    var calories_per_weight = this.foodTable.filter(item => parseFloat(item.weight_kg) == closest)[0];
    console.log('Calories',calories_per_weight,calories_per_weight[dog_activity])

  }
  
}
