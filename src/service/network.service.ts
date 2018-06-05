// import { Injectable } from '@angular/core';
// import { Network } from '@ionic-native/network';

// @Injectable()
// export class NetworkService {

//     isConnected:boolean = false;
//     disconnectSubscription:any;
//     connectSubscription:any;

//     constructor(private network : Network){ }

//     onDisconnect(){
//         this.disconnectSubscription = this.network.onDisconnect().subscribe(
//             () => {
//                 console.log('network was disconnected :-(');
//             });
//         this.disconnectSubscription.unsubscribe();
//     }

//     onConnect() {
//         let connectSubscription = this.network.onConnect.subscribe(
//             () => {
//                 console.log('network connected');
//                 setTimeout( () => {
//                     if(this.network.type === 'wifi') {
//                         console.log('got a wifi connection.');
//                     }
//                 },2000);
//             });
//         connectSubscription.unsubscribe();
//     }
// }