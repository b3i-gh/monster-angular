import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Monster } from './monster';
import { environment } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class MonsterService {
  private apiServerUrl = environment.apiBaseUrl + '/monster/api';
  private apiVersionUrl = '/v1.1';

  constructor(private http: HttpClient) { }

    public getMonsters(): Observable<any> {
      return this.http.get<any>(`${this.apiServerUrl}${this.apiVersionUrl}/all`);
    }

    public addMonster(monster: Monster): Observable<Monster> {
      return this.http.post<Monster>(`${this.apiServerUrl}${this.apiVersionUrl}/add`, monster);
  }

  public updateMonster(monster: Monster): Observable<Monster> {
      return this.http.put<Monster>(`${this.apiServerUrl}${this.apiVersionUrl}/update`, monster);
  }

  public deleteMonster(monsterId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}${this.apiVersionUrl}/delete/${monsterId}`);
  }
  
}
