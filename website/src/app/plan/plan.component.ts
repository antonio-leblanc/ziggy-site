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
    {name:'Acima do peso', value:1},
    {name:'Com o peso ideal', value:0},
    {name:'Abaixo de peso', value:-1},
  ]

  min_weight = 0;
  max_weight = 99;

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
      age: ['5', [Validators.required, Validators.min(1)]],
      breed: ['Labrador', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      weight: ['', Validators.required],
      weight_range: ['', Validators.required],
      ideal_weight: ['', [Validators.min(this.min_weight), Validators.max(this.max_weight)]],
    });
    
    this.fourthFormGroup = this._formBuilder.group({
      activity: ['', Validators.required],
    });
    
    this.fithFormGroup = this._formBuilder.group({
      illness: ['', Validators.required],
      special_case: ['', Validators.required],
    });
  }

  changeWeight() {
    console.log('mudou peso',this.thirdFormGroup.value.weight_range)
    var actual_weight = this.thirdFormGroup.value.weight
    // this.thirdFormGroup.patchValue({
    //   ideal_weight: actual_weight
    // })
    if (this.thirdFormGroup.value.weight_range == 1){
      this.thirdFormGroup.controls['ideal_weight'].setValidators(
        [, 
        Validators.min(0),
        Validators.max(actual_weight)]);
      this.max_weight = actual_weight
    }
    if (this.thirdFormGroup.value.weight_range == -1){
      this.thirdFormGroup.controls['ideal_weight'].setValidators(
        [
        Validators.min(actual_weight),
        Validators.max(99)]);
        this.min_weight = actual_weight
    }
    this.thirdFormGroup.controls['ideal_weight'].updateValueAndValidity()
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
