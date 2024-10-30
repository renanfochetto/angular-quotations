import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FrasesService {
  private apiUrl = 'https://zenquotes.io/random'
  constructor(private http: HttpClient) { }

  obterFraseDoDia(): Observable<any> {
    console.log("Chamando API:", this.apiUrl);
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError((): Error => new Error('Algo deu errado; por favor, tente novamente mais tarde.'));
  }
}
