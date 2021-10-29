import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; 
import { User } from '../models/user';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public userList: Observable<User[]>;
  constructor(
    private aft:AngularFirestore,
    private afauth:AngularFireAuth,
    private autservice: AuthService,
    private route:Router  
    
    ){
     
    }
    ngOnInit() {
      this.userList = this.autservice.getuserList();
      
    }

    logout(): void{
      this.afauth.signOut().then(()=>{
        this.route.navigate(['/login']);
      })
    }

    profile(){
      this.route.navigate(['/profile']);
    }
    search(){
      this.route.navigate(['/search']);
    }
}
