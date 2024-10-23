import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FrasesService {

  constructor(private http: HttpClient) { }

  obterFraseDoDia(tema: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${tema}`);
  }
}
