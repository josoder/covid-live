import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TotalStats } from '../model/total-stats';
import { StatsService } from '../service/stats.service';
import { SSEService } from '../../../core/services/sse/sse.service';
import { environment } from '../../../../environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatsFacade {
  constructor(private statsService: StatsService,
              private sseService: SSEService) {
  }

  getTotalStatsStream(): Observable<TotalStats> {
    return this.sseService.getSSEStream(environment.api.root + 'watch/total')
      .pipe(
        map(event => JSON.parse(event.data)),
        tap(stat => console.log(stat))
      );
  }

  getCurrentTotal(): Observable<TotalStats> {
    return this.statsService.getCurrentTotal();
  }
}
