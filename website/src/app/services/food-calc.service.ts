import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodCalcService {

  constructor() { }
  
  packagePrices = {
    'adulto':8.5,
    'idoso':9.5,
  }

  calories_per_gram = 1;
  grams_per_package = 500;

  foodTable = this.getFoodTable()

  calculatePlan(dog){
    dog.type = (dog.age >= 8) ? 'idoso' : 'adulto';
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

  getBreeds(){
    return [
      {'name':'Labrador'},
      {'name':'Buldog Francês'},
      {'name':'Chitsu'},
      {'name':'Puggie'},
      {'name':'Outro'},
      {'name':'Sem raça definida'},
    ]
  }
  getFoodTable() {
    return [
      {
          "weight_kg": "1.81",
          "inactive": "130",
          "active": "180",
          "extra_active": "210"
      },
      {
          "weight_kg": "2.72",
          "inactive": "160",
          "active": "210",
          "extra_active": "250"
      },
      {
          "weight_kg": "3.63",
          "inactive": "230",
          "active": "300",
          "extra_active": "350"
      },
      {
          "weight_kg": "4.54",
          "inactive": "270",
          "active": "350",
          "extra_active": "410"
      },
      {
          "weight_kg": "5.44",
          "inactive": "310",
          "active": "400",
          "extra_active": "470"
      },
      {
          "weight_kg": "6.35",
          "inactive": "340",
          "active": "450",
          "extra_active": "530"
      },
      {
          "weight_kg": "6.8",
          "inactive": "360",
          "active": "470",
          "extra_active": "560"
      },
      {
          "weight_kg": "7.26",
          "inactive": "380",
          "active": "500",
          "extra_active": "590"
      },
      {
          "weight_kg": "8.16",
          "inactive": "410",
          "active": "540",
          "extra_active": "640"
      },
      {
          "weight_kg": "9.07",
          "inactive": "450",
          "active": "590",
          "extra_active": "700"
      },
      {
          "weight_kg": "11.34",
          "inactive": "530",
          "active": "700",
          "extra_active": "820"
      },
      {
          "weight_kg": "13.61",
          "inactive": "610",
          "active": "800",
          "extra_active": "940"
      },
      {
          "weight_kg": "15.88",
          "inactive": "680",
          "active": "900",
          "extra_active": "1060"
      },
      {
          "weight_kg": "18.14",
          "inactive": "750",
          "active": "990",
          "extra_active": "1170"
      },
      {
          "weight_kg": "20.41",
          "inactive": "820",
          "active": "1080",
          "extra_active": "1280"
      },
      {
          "weight_kg": "22.68",
          "inactive": "890",
          "active": "1170",
          "extra_active": "1380"
      },
      {
          "weight_kg": "24.95",
          "inactive": "960",
          "active": "1260",
          "extra_active": "1490"
      },
      {
          "weight_kg": "27.22",
          "inactive": "1020",
          "active": "1340",
          "extra_active": "1590"
      },
      {
          "weight_kg": "29.48",
          "inactive": "1080",
          "active": "1430",
          "extra_active": "1690"
      },
      {
          "weight_kg": "31.75",
          "inactive": "1150",
          "active": "1510",
          "extra_active": "1780"
      },
      {
          "weight_kg": "34.02",
          "inactive": "1210",
          "active": "1590",
          "extra_active": "1880"
      },
      {
          "weight_kg": "36.29",
          "inactive": "1270",
          "active": "1670",
          "extra_active": "1970"
      },
      {
          "weight_kg": "38.56",
          "inactive": "1320",
          "active": "1740",
          "extra_active": "2060"
      },
      {
          "weight_kg": "40.82",
          "inactive": "1380",
          "active": "1820",
          "extra_active": "2150"
      },
      {
          "weight_kg": "43.09",
          "inactive": "1440",
          "active": "1900",
          "extra_active": "2240"
      },
      {
          "weight_kg": "49.9",
          "inactive": "1500",
          "active": "1970",
          "extra_active": "2330"
      },
      {
          "weight_kg": "47.63",
          "inactive": "1550",
          "active": "2040",
          "extra_active": "2420"
      },
      {
          "weight_kg": "49.9",
          "inactive": "1610",
          "active": "2120",
          "extra_active": "2500"
      },
      {
          "weight_kg": "52.16",
          "inactive": "1660",
          "active": "2190",
          "extra_active": "2590"
      },
      {
          "weight_kg": "54.43",
          "inactive": "1720",
          "active": "2260",
          "extra_active": "2670"
      },
      {
          "weight_kg": "56.7",
          "inactive": "1770",
          "active": "2330",
          "extra_active": "2750"
      },
      {
          "weight_kg": "58.97",
          "inactive": "1820",
          "active": "2400",
          "extra_active": "2830"
      },
      {
          "weight_kg": "61.23",
          "inactive": "1870",
          "active": "2470",
          "extra_active": "2920"
      },
      {
          "weight_kg": "63.5",
          "inactive": "1930",
          "active": "2530",
          "extra_active": "3000"
      },
      {
          "weight_kg": "65.77",
          "inactive": "1980",
          "active": "2600",
          "extra_active": "3080"
      },
      {
          "weight_kg": "68.04",
          "inactive": "2030",
          "active": "2670",
          "extra_active": "3160"
      },
      {
          "weight_kg": "70.31",
          "inactive": "2080",
          "active": "2740",
          "extra_active": "3230"
      },
      {
          "weight_kg": "72.57",
          "inactive": "2130",
          "active": "2800",
          "extra_active": "3310"
      },
      {
          "weight_kg": "77.11",
          "inactive": "2230",
          "active": "2930",
          "extra_active": "3470"
      },
      {
          "weight_kg": "81.65",
          "inactive": "2330",
          "active": "3060",
          "extra_active": "3620"
      },
      {
          "weight_kg": "86.18",
          "inactive": "2420",
          "active": "3190",
          "extra_active": "3770"
      },
      {
          "weight_kg": "90.72",
          "inactive": "2520",
          "active": "3310",
          "extra_active": "3920"
      }
    ]
  }

}
