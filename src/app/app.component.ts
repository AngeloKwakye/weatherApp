import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showerror = false;
  errorMessage: string = '';
  cityName: string = 'Accra';
  weatherData?: WeatherData
  kelvin =  273.15;

  constructor(private weatherService: WeatherService){

  }

  ngOnInit(): void {
   this.getweatherData(this.cityName);
  }

  onSubmit(){
    this.getweatherData(this.cityName);
    this.cityName = ''
  }

  private getweatherData(cityname: string){
    this.weatherService.getWeatherData(cityname)
    .subscribe({
      next: (result) =>{
        this.weatherData = result;
       // console.log(result)
      }, error: (error) =>{
        // console.log(error);
        if(error.status = 404){
          this.showerror = true;
          this.showNotification()
        }
      }
    });
  }

  showNotification(): void{
    this.weatherService.showNotification('City not found.  Please check City Name and try again')
  }
}
