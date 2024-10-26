import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Traducao } from "../interfaces/traducao.interface";

@Injectable({
  providedIn: 'root'
})
export class TraducaoService {

  private apiUrl: string = 'https://api.mymemory.translated.net/get';
  private traducoes: { [chave: string]: { [chave: string]: string} } = {
    pt: {
      titulo: 'Que tal uma citação para o dia de hoje?',
      botaoGerar: 'Gerar citação'
    },
    en: {
      titulo: 'How about a quote for today?',
      botaoGerar: 'Generate Quote'
    }
  }

  constructor(private http: HttpClient) { }

  translate(texto: string, idiomaOriginal: string, idiomaFinal: string): Observable<Traducao> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(texto)}&langpair=${idiomaOriginal}|${idiomaFinal}`
    return this.http.get<Traducao>(url);
    };

  getTraducao(idioma: string, chave: string): string {
    return this.traducoes[idioma]?.[chave] || chave;
  }
}
