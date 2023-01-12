import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http:HttpClient) { }


  login(email:any,password:any){
    
    const data={
      email,
      password    
    }

    return this.http.post('http://localhost:3000/login',data)
  }


  register(email:any,username:any,password:any){

    const data={
   
      email,
      username,
      password,
    }

    return this.http.post('http://localhost:3000/register',data)//asynchronous call to conncet btw fe and be in be we use cors 

    

   }


   getToken()
   {
    //fetch token
    const token = JSON.parse(localStorage.getItem('token')||'')
    //assign to headers
    let headers=new HttpHeaders()
    if(token)
    {
      options.headers=headers.append('x-access-token',token)
    }
    return options//to get token

   }


   todo(email:any,pswd:any,todo:any)
   {
    const data={
      email,
      pswd,
      todo
    }

    return this.http.post("http://localhost:3000/todo",data,this.getToken())

}


}