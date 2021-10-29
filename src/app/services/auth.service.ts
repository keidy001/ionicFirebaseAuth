import { Injectable } from '@angular/core';
import 	{User} from '../models/user';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
//import * as firebase from 'firebase/compat';
//import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/database';
import '@firebase/firestore';
import { Router } from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
//import { LoginPageRoutingModule } from '../login/login-routing.module';
@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  user$: Observable<User>;
  user:User;
  constructor(
    private route:Router,
    private aft: AngularFirestore,
    private afauth: AngularFireAuth,
    private LoadingCtrl:LoadingController,
    private toastM: ToastController
  ) {

    this.user$ = this.afauth.authState
    .pipe(
      switchMap(user => {
  
      if(user)
      {
      return this.aft.doc<User>(`users/${user.uid}`).valueChanges();
      }else{
        return of (null);
      }
      })
  
    )

   }

   getuserList(): Observable<User[]> {
    return this.aft.collection<User>(`users`).valueChanges();
  }


   async signIn(email, password)
{
	const loading = await this.LoadingCtrl.create({
	 message: 'Connxion...',
	 spinner: 'crescent',
	 showBackdrop: true
	});

	loading.present();
	this.afauth.signInWithEmailAndPassword(email, password)
	.then((data)=>{
		if(!data.user.emailVerified){
		loading.dismiss();
		this.toast('Veillez verifier votre adresse email', 'warning');
		this.afauth.signOut(); 
		}else{
			loading.dismiss();
			this.route.navigate(['/home']);
		}
	}).catch(error =>{
    loading.dismiss();
    this.toast(error.message, 'danger');
}).catch(error =>{
  loading.dismiss();
  this.toast(error.message, 'danger');
});

	}

async signOut(){
  const loading = await this.LoadingCtrl.create({
    spinner: 'crescent',
    showBackdrop:true
  });
  loading.present();
  this.afauth.signOut().then(()=>{
    loading.dismiss();
  this.route.navigate(['/login']); 
   } )
}
async toast(message, status)
{
	const toast = await  this.toastM.create({
		message: message,
		color: status,
		position: 'top',
		duration: 2000

	});
	toast.present();
}
}
