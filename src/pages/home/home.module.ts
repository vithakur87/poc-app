import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { SharedModule } from './../../components/header/shared.module';
// import { HeaderComponent } from './../../components/header/header';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    SharedModule
  ],
})
export class HomePageModule {}
