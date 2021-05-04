import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { Camera } from '@ionic-native/camera/ngx'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

const firebaseConfig = {
  apiKey: "AIzaSyAZ_IdGnUx9KvOh4WI5-FGig5AZEf9l7rk",
  authDomain: "mygallery-88a5a.firebaseapp.com",
  projectId: "mygallery-88a5a",
  storageBucket: "mygallery-88a5a.appspot.com",
  messagingSenderId: "729302547857",
  appId: "1:729302547857:web:76115f847d85562407ee30",
  measurementId: "G-ZF0YJ79PGL"
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(firebaseConfig),AngularFireDatabaseModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    SocialSharing
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
