import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nom:string;
  prenom:string;
  email:string;
  telephone:string;
  password:string;
  confirmPassword:string;
  samePassword:boolean;

  constructor(
    private aft:AngularFirestore,
    private afauth:AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastM:ToastController,
    private route:Router

  ) { }

  ngOnInit() {
  }
  //creation de la fonction d'inscription
  async register(){
    if(this.nom && this.prenom && this.email && this.password){
      const loading = await this.loadingCtrl.create({
        message:'loading..',
        spinner:'crescent',
        showBackdrop:true
      });
      loading.present();
      this.afauth.createUserWithEmailAndPassword(this.email , this.password).then((data)=> {
        this.aft.collection('users').doc(data.user.uid).set({
          'userId':data.user.uid,
          'nom':this.nom,
          'prenom':this.prenom,
          'email':this.email,
          'telephone':this.telephone,
          'createdAt':Date.now()
        });
        data.user.sendEmailVerification();
      })
      .then(()=>{
        this.toast('Enregistrer avec success', 'success');
        loading.dismiss();
        this.route.navigate(['/login'])
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
  verifierPassword()
  {
    if(this.password == this.confirmPassword){
      this.samePassword = true;
    } else {
      this.samePassword = false; 
    }
  }
//creation d'une fonction toast msg 
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
