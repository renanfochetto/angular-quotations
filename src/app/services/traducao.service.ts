import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Traducao } from "../interfaces/traducao.interface";

@Injectable({
  providedIn: 'root'
})
export class TraducaoService {

  private apiUrl: string = 'https://api.mymemory.translated.net/get';

  constructor(private http: HttpClient) { }

  translate(texto: string, idiomaOriginal: string, idiomaFinal: string): Observable<Traducao> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(texto)}&langpair=${idiomaOriginal}|${idiomaFinal}`
    return this.http.get<Traducao>(url);
    };
}
