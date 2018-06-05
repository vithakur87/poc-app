import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from './../../models/user.model';
import { HomePage } from './../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from './../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  pageTitle:string = 'Login';
  user = {} as User;
  constructor(private afAuth:AngularFireAuth,
     public navCtrl: NavController,
      public navParams: NavParams,
      private toastCtrl:ToastController,
      private loadingCtrl:LoadingController) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

  async login(user:User){
    this.presentLoading();
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      
      // console.log(result);
      result.then(response => {
        console.log('Login response ', response);
        // if(response.user.sa.uid != null){
          this.navCtrl.setRoot(HomePage, {
            email : "test@test.com"
          });
        // }
      })
      .catch(error => {
        console.log('error found ',error);
        this.presentToast();
      });
    }
    finally{  
      console.log('data retrieved');
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message : 'Invalid Login Credentials',
      duration : 4000
    });
    toast.present(); 
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content:'Logging in...',
      duration:1000
    });
    loader.present();
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }
}
