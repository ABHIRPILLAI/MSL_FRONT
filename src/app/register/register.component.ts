import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm=this.fb.group({//group
    email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]],
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],//array
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private router:Router , private ds:DataserviceService, private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  register()
  {
    console.log(this.registerForm);
    

    // alert('')
    var email=this.registerForm.value.email;
    var username=this.registerForm.value.username;
    var password=this.registerForm.value.pswd;

    if(this.registerForm.valid)
    {
      console.log(this.registerForm.get('username')?.errors);
     this.ds.register(email,username,password)
      .subscribe((result:any)=>{
        alert( result.message);
        this.router.navigateByUrl('')
      })
    // if(result)
    // {
    // alert('Register Successful');
    // this.router.navigateByUrl('')
    // }
    // else{
    //   alert('Register Failed');
    //   this.router.navigateByUrl('register')
    // }
    }else{
      alert('invalid form')
    }
}
}