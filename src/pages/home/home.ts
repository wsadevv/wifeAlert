import { Component } from '@angular/core';
import { Geolocation,Geofence, SMS } from 'ionic-native';
import {ActivePage} from '../active/active';
import { NavController,Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  radius: number = 100;
  error: any;
  success:any;

  constructor(public navCtrl: NavController, private platform: Platform) {
    this.platform.ready().then(() => {

     Geofence.initialize().then(
       () => console.log('Geofence Plugin Ready'),
       (err) => console.log(err)
     );

   });
  }

  setGeofence(value: number) {

    Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then((resp) => {
      var longitude = resp.coords.longitude;
      var latitude = resp.coords.latitude;
      var radius = value;

      let fence = {
          id: "myGeofenceID1",
          latitude:       latitude,
          longitude:      longitude,
          radius:         radius,
          transitionType: 2
        }

        Geofence.addOrUpdate(fence).then(
          () => this.success = true,
          (err) => this.error = "Failed to add or update the fence."
        );

        Geofence.onTransitionReceived().subscribe(resp => {
          SMS.send('5555555555', 'OMG She lied, leave her now!');
        });

        this.navCtrl.push(ActivePage);


    }).catch((error) => {
      this.error = error;
    });
  }

}
