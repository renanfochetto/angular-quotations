import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})

export class FotoService {
  private apiUrl = 'https://api.unsplash.com/photos/random?query=landscape';

  constructor(
    private http: HttpClient
  ) { }

  getFoto(): Observable<any> {
    return this.http.get(`${this.apiUrl}&client_id=${environment.unplashChave}`);
  }
}
