import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService, private storage: StorageService, private router: Router) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]);

  ngOnInit(): void {
  }
  getEmailMessage() {
    if (this.email.hasError('required')) {
      return 'Email is required!';
    }

    return this.email.hasError('email') ? 'Email msu be valid' : '';
  }
  getPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'Password is required!';
    }

    return 'Password must be between 6-15 character long.'
  }
  login() {
    this.api.post('common/login', {
      email: this.email.value,
      password: this.password.value,
    }).subscribe((res: any) => {
      this.storage.set('x-access-token', res.object.token);
      this.router.navigate(['dashboard'])
    })
  }

}
