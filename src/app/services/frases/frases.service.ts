import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FrasesService {
  constructor(private http: HttpClient) { }

  obterFraseDoDia(): Observable<any> {
    return this.http.get<any>('/api/random').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError((): Error => new Error('Algo deu errado; por favor, tente novamente mais tarde.'));
  }
}
