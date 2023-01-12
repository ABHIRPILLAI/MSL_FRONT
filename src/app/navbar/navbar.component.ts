import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})



export class NavbarComponent implements OnInit {
  user="";
  constructor(private router:Router) {
    if (localStorage.getItem('currentUser')) {
      this.user=JSON.parse(localStorage.getItem('currentUser')||"")//give the value to user and do string interpolattion
    }
   }

  ngOnInit(): void {
  }

  logout()
  {
    this.router.navigateByUrl("")
  }
}
