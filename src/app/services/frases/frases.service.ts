import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Frase } from "../../interfaces/frases.interface";
import { environment } from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class FrasesService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  obterFraseDoDia(): Observable<Frase> {
    console.log("Chamando API:", this.apiUrl);
    return this.http.get<Frase>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError((): Error => new Error('Algo deu errado; por favor, tente novamente mais tarde.'));
  }
}
