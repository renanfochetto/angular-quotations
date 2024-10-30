import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  private apiUrl: string = 'http://localhost:3000/api/imagem';

  constructor(
    private http: HttpClient
  ) { }

  getFoto(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError((): Error => new Error('Algo deu errado; por favor, tente novamente mais tarde.'));
  }
}

