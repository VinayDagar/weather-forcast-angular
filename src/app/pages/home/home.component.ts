import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private api: ApiService, private storage: StorageService) { }

  ngOnInit(): void {
    this.api.get('common/search/delhi').subscribe((res: any) => this.storage.set("location", res.woeid))
  }

  navigateToLogin() {
    this.router.navigate(['login'])
  }

}
