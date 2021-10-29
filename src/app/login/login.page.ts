import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string;
  password:string;
  constructor(
    private aft:AngularFirestore,
    private afauth:AngularFireAuth,
    private toastM:ToastController,
    private route:Router,
    private auth:AuthService,
    private loadingCtrl: LoadingController

  ) { }

  ngOnInit() {
  }

  forgotPsw(){
    this.route.navigate(['/forgot-password']);
  }

  async login(){
    if(this.email && this.password){
      const loading = await this.loadingCtrl.create({
        message: 'Chargement...',
        spinner: 'crescent',
        showBackdrop:true
      });
      loading.present();
      this.auth.signIn(this.email, this.password)
      .then(()=>{
        //this.toast('Enregistrer avec success', 'success');
        loading.dismiss();
        
      })
      .catch((error)=>
      {
        loading.dismiss();
        this.toast(error.message, 'danger')
      })
    }else {
      this.toast('Veillez remplir correctement tous les champs', 'danger');
    }
    
  }

  register(){
    this.route.navigate(['/register']);
  }

  async toast(message, status){
    const toast = await this.toastM.create({
      message:message,
      position:'top',
      color: status,
      duration:2000
    });
    toast.present();
  }
}
