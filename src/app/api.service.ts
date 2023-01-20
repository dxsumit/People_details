import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // api url, hosted in replit
  baseURL:String = "https://people-api.ced19i028sumit.repl.co";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }

  // post request
  addPerson(data:any){
    return this.http.post<any>(`${this.baseURL}/create`, data, this.httpOptions)
    .pipe(map( (res:any)=>{
      return res;
    } ))
  }


  getPeople(){
    return this.http.get<any>(`${this.baseURL}/all`)
    .pipe(map( (res:any)=>{
      return res;
    } ))
  }

  updatePerson(data:any, id:number){
    return this.http.patch<any>(`${this.baseURL}/update/${id}`, data, this.httpOptions)
    .pipe(map( (res:any)=>{
      return res;
    } ))
  }

  deletePerson(id:number){
    return this.http.delete<any>(`${this.baseURL}/delete/${id}`, this.httpOptions)
    .pipe(map( (res:any)=>{
      return res;
    } ))
  }


}
