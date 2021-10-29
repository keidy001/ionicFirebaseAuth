import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    user:any;
  constructor(
    private afauth:AuthService,
    private route:Router
  ) { }

  ngOnInit() {
      this.afauth.user$.subscribe(user =>{
        this.user = user;
        
      })

  }
  
}
