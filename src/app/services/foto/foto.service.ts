import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ConfigService } from "../config/config.service";

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  private apiUrl: string = 'https://api.unsplash.com/photos/random?query=landscape';

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  getFoto(): Observable<any> {
    const clientId = this.configService.unsplashChave;
    return this.http.get(`${this.apiUrl}&client_id=${clientId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError((): Error => new Error('Algo deu errado; por favor, tente novamente mais tarde.'));
  }
}

