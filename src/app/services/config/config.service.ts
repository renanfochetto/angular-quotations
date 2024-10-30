import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<any> {
    return this.http.get('/assets/config.json');
  }

  get unsplashChave(): string {
    return this.config?.unsplashChave;
  }

  setConfig(config: any) {
    this.config = config;
  }
}
