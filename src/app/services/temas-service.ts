import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  constructor(private http: HttpClient) { }

  obterTemas(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/categories?language=en`);
  }
}
