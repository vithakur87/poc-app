import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  Platform,
  AlertController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { BatteryStatus } from '@ionic-native/battery-status';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable,Subscription } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public userEmail;
  public pageTitle = 'Home';
  level : number;
  isPlugged : boolean;
  disconnectSubscription:Subscription;
  connectSubscription:Subscription;
  map : GoogleMap;
  latitude : number;
  longitude : number;
  isConnected : boolean;

  constructor(public navCtrl: NavController,
              private toast:ToastController,
              public navParams: NavParams,
              private network : Network,
              private batteryStatus:BatteryStatus,
              private alertCtrl:AlertController,
              private geolocation:Geolocation,
              private afAuth:AngularFireAuth) {

    this.userEmail = navParams.get("email");
    console.log("Email returned ", this.userEmail);
  }

  ionViewWillEnter(){
    this.afAuth.authState.subscribe( data => {
      if(data && data.email && data.uid){
        this.toast.create({
          message:`Welcome to the APP_NAME , ${data.email}`,
          duration:2000
        }).present();
      }
    });
    this.loadMap();
    this.getStatus();
    this.onConnect();
    this.onDisconnect();

    this.geolocation.getCurrentPosition()
    .then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    })
    .catch((error) => {
      console.log('Error getting Location',error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
    });
  }
  ionViewDidLoad() {
    this.afAuth.authState.subscribe( data => {
      if(data && data.email && data.uid){
        this.toast.create({
          message:`Welcome to the APP_NAME , ${data.email}`,
          duration:2000
        }).present();
      }
    });
    this.loadMap();
    this.getStatus();
    this.onConnect();
    this.onDisconnect();

    this.geolocation.getCurrentPosition()
    .then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    })
    .catch((error) => {
      console.log('Error getting Location',error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
    });
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.latitude,
          lng: this.longitude
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.latitude,
        lng: this.longitude
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }  
  ionViewWillLeave(){
    this.connectSubscription.unsubscribe();
    this.disconnectSubscription.unsubscribe();
  }
  getStatus(){
    this.batteryStatus.onChange().subscribe( status => {
      this.level = status.level;
      this.isPlugged = status.isPlugged;
    });
  }

  onConnect() {
    this.connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected');
      this.isConnected = true;
      setTimeout(() => {
        if(this.network.type === 'wifi'){
          let toast = this.toast.create({
            message:'Wifi Network found and connected',
            duration:2000
          });
          toast.present();
        }
      },2000);
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title:'Low Network',
      subTitle:'Unable to connect to wifi',
      buttons : ['Dismiss']
    });
    alert.present();
  }

  onDisconnect() {
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.isConnected = false;
      while(!this.isConnected){
        this.presentAlert();
      }
      let toast = this.toast.create({
        message:'Wifi Network disconnected',
        duration:2000
      });
      toast.present();
    });
  }
}