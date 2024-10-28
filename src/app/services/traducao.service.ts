import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Traducao } from "../interfaces/traducao.interface";

@Injectable({
  providedIn: 'root'
})
export class TraducaoService {
  private apiUrl: string = 'https://api.mymemory.translated.net/get';

  constructor(private http: HttpClient) { }

  translate(texto: string, idiomaOriginal: string, idiomaFinal: string): Observable<Traducao> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(texto)}&langpair=${idiomaOriginal}|${idiomaFinal}`;
    return this.http.get<Traducao>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError((): Error => new Error('Algo deu errado; por favor, tente novamente mais tarde.'));
  }
}
