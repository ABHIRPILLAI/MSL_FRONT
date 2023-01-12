import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {




  loginForm=this.fb.group({//group
    email:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })


  constructor(private router:Router , private ds:DataserviceService, private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  login()
  {
    // alert('Login Clicked');//event binding
    var email=this.loginForm.value.email;//1000
    var pswd=this.loginForm.value.pswd;
    // var userDetails=this.ds.userDetail//also a depedency injection coz this file is in servies and dataservice class under it comes

    if(this.loginForm.valid)
    {
    this.ds.login(email,pswd)
    .subscribe((result:any)=>
    {
      localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
      localStorage.setItem('currentEmail',JSON.stringify(result.currentEmail))
      localStorage.setItem('token',JSON.stringify(result.token))
      
      alert(result.message);
      this.router.navigateByUrl('todo')

    },
    result=>{
      alert(result.error.message)
    }
    )
  }

}
}

