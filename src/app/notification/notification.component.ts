import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  meSSage: string | null = null;
  private subscription: Subscription = new Subscription();

  constructor( private service: WeatherService) { }
 
  ngOnInit(): void {
    this.subscription.add(
      this.service.notification.subscribe((message) =>{
        this.meSSage = message;
        if(message){
          setTimeout(() =>{
            this.clearNotification();
          }, 4000)
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clearNotification(): void{
    this.service.clearNotification()
  }
}
