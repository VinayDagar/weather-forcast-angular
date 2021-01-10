import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  location: string = '';
  search: string = '';
  weatherData: any = [];
  weatherDetails: any;
  isLoading: boolean = true;
  displayedColumns: any = ['date', 'name', 'icon', 'min_temp', 'max_temp', 'humidity', 'visibility'];

  constructor(private storage: StorageService, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.location = this.storage.get("location");
    this.getWeatherForcast()
  }

  searchForLocation() {
    if (this.search) {
      this.isLoading = true
      this.api.get(`common/search/${this.search}`).subscribe((res: any) => {
        if (res.woeid) {
          this.storage.set("location", res.woeid);
          this.location = res.woeid
          this.getWeatherForcast()
        }
        this.search = ""
      })
    }
  };

  getWeatherForcast() {
    this.isLoading = true
    this.api.getWithHeaders(`common/weather/${this.location}`).subscribe((res: any) => {
      this.weatherData = res.consolidated_weather;
      this.weatherDetails = {
        title: res.title,
        sunRise: res.sun_rise,
        sunSet: res.sun_set,
      }
      this.isLoading = false
    })
  }
  logout() {
    this.storage.clear();
    this.router.navigate([''])
  }

}
