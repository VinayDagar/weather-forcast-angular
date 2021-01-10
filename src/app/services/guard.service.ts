import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router"
import { StorageService } from "./storage.service"

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(protected router: Router, private auth: StorageService) { }

  canActivate() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["login"])
      return false
    }
    return true
  }
}
