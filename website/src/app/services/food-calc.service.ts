import { Injectable } from '@angular/core';
import { foodTable } from './foodTable'

@Injectable({
  providedIn: 'root'
})
export class FoodCalcService {

  constructor() { }
  
  packagePrices = {
    'adult':8.5,
    'old':9.5,
  }

  calories_per_gram = 1;
  grams_per_package = 500;

  foodTable = foodTable

  calculatePlan(dog){
    dog.type = (dog.age >= 8) ? 'old' : 'adult';
    dog.package_price = this.packagePrices[dog.type];
    
    dog.calories_per_day =  this.getCaloriesPerDay(dog);
    
    dog.grams_per_day = dog.calories_per_day / this.calories_per_gram
    dog.packages_per_day = dog.grams_per_day/this.grams_per_package;

    dog.grams_per_week = dog.grams_per_day * 7;
    dog.packages_per_week = Math.round(dog.packages_per_day*7);
    
    dog.price_per_week = dog.packages_per_week*dog.package_price;
    
    return dog
  }

  getCaloriesPerDay(dog){
    var all_weights = this.foodTable.map(item => parseFloat(item.weight_kg) );

    var closest_weight = all_weights.reduce((prev, curr) => {
      return (Math.abs(curr - dog.weight) < Math.abs(prev - dog.weight) ? curr : prev);
    });

    var calories_per_weight_table = this.foodTable.filter(item => parseFloat(item.weight_kg) == closest_weight)[0];
    
    return parseFloat(calories_per_weight_table[dog.activity])
  }

  getWeeklyPrice(dog){

  }
}