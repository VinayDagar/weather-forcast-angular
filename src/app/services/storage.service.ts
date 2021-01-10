import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public getAuthToken(): any {
    return localStorage.getItem('x-access-token');
  };

  public get(key: string): any {
    return localStorage.getItem(key);
  };

  public set(key: string, value: any): void {
    localStorage.setItem(key, value);
  };

  public clear(): void {
    localStorage.clear();
  };

  public remove(key: string) {
    localStorage.removeItem(key);
  };

  public isAuthenticated(): boolean {
    if (!this.getAuthToken()) {
      return false
    }
    return true
  };
}
