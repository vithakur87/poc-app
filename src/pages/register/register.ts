import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  pageTitle:string = 'Register';  
  user = {} as User;
  constructor(private afAuth:AngularFireAuth,
     public navCtrl: NavController,
     private toastCntrl : ToastController,
      public navParams: NavParams) {
  }

  async register(user:User){
    try{
      const result = this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
      console.log(result);
      result.then(data =>{
        console.log("Received data ",data);
        this.presentToast();
      })
      .catch(error => {
        console.log("Error data ",error);
      });
    }
    finally{
      console.log("Error found");
    }  
  }

  presentToast() {
    let toast = this.toastCntrl.create({
      message : 'User Successfully Registered',
      duration : 2000
    });
    toast.present(); 
  }
}
