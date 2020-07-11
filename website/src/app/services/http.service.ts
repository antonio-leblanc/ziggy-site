import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  async getJSON(file){
    let file_path = '../../assets/json/'+file
    return await this.http.get(file_path).toPromise().then(data => data, err => null);
  }

}
