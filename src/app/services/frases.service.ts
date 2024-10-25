import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrasesService {
  constructor(private http: HttpClient) { }

  obterFraseDoDia(): Observable<any> {
    return this.http.get<any>('/api/random');
  }
}
