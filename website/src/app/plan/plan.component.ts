import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FoodCalcService } from '../services/food-calc.service';
import { HttpService } from '../services/http.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {breedsGroups} from './breeds'

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private foodCalc: FoodCalcService, private http: HttpService) {}
  
  filteredOptions: Observable<string[]>;
  loading :boolean = true;
  calculating :boolean = false;
  finished :boolean = false;

  dog:any ;
  breeds:any ;
  
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

  firstFormGroup: FormGroup = this._formBuilder.group({
    name: ['', Validators.required]
    });
  secondFormGroup: FormGroup  = this._formBuilder.group({
    age: ['', [Validators.required, Validators.min(1)]],
    breed: ['', Validators.required],
  });
  thirdFormGroup: FormGroup = this._formBuilder.group({
    weight: ['', Validators.required],
    weight_range: ['', Validators.required],
    ideal_weight: ['', [Validators.min(this.min_weight), Validators.max(this.max_weight)]],
  });
  fourthFormGroup: FormGroup = this._formBuilder.group({
    activity: ['', Validators.required],
  });
  fithFormGroup: FormGroup = this._formBuilder.group({
    illness: ['', Validators.required],
    special_case: ['', Validators.required],
  });

  stateGroups = breedsGroups
  stateGroupOptions: Observable<any[]>;
  async ngOnInit() {
    this.breeds = await this.http.getJSON('breeds.json')
    this.loading = false;
    this.stateGroupOptions = this.secondFormGroup.get('breed')!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterGroup(value))
    );
  }

  private _filterGroup(value: string): any[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
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
    this.calculating = true;
    this.finished = false;

    this.dog = Object.assign({}, 
      this.firstFormGroup.value,
      this.secondFormGroup.value,
      this.thirdFormGroup.value,
      this.fourthFormGroup.value,
      this.fithFormGroup.value,
      );
    
    
    this.dog = this.foodCalc.calculatePlan(this.dog)
    
    console.log(this.dog)
        
    setTimeout( () => {
      this.calculating = false;
      this.finished = true;
    },3000)
  }
  
}
