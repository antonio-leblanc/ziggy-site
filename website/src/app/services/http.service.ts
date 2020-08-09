import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'true',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    })
  }

  async getJSON(file){
    let file_path = '../../assets/json/'+file
    return await this.http.get(file_path).toPromise().then(data => data, err => null);
  }

  async postPlan(dogObj){
    return await this.http.post(environment.mail_api ,dogObj, this.httpOptions).toPromise().then(data => data, err => null);
  }

}
