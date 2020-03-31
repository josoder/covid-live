import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TotalStats } from '../model/total-stats';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) {
  }

  getCurrentTotal(): Observable<TotalStats> {
    return this.http.get<TotalStats>(environment.api.root);
  }
}
