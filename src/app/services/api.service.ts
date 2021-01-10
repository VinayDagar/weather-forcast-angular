import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private extractData(res: any) {
    return res.object || null;
  }

  public post(url: string, body: any) {
    return this.http.post(`${API_URL}/api/v1/${url}`, body)
  }
  public get(url: string) {
    return this.http.get(`${API_URL}/api/v1/${url}`)
  }

  public getWithHeaders(url: string) {
    const token: any = localStorage.getItem("x-access-token");
    return this.http.get(`${API_URL}/api/v1/${url}`, {
      headers: {
        "Conetent-Type": "application/json",
        "x-access-token": `Breare ${token}`
      }
    })
  }

  public getWeatherLocation(search: string) {
    return this.http.get(`${environment.weatherAPI}/location/search/?query=${search}`)
  }

  public getWeatherDetails(id: string) {
    return this.http.get(`${environment.weatherAPI}/location/${id}`)
  }

  public getWeather(url: string) {
    return this.http.get(`${environment.weatherAPI}/${url}`)
  }
}
