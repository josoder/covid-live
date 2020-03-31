import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SSEService {

  constructor(private zone: NgZone) {
  }

  getSSEStream(url): Observable<any> {
    return new Observable<any>(observer => {
      const eventSource = this.getEventSource(url);

      eventSource.onmessage = event => {
        this.zone.run(() => {
          observer.next(event);
        });
      };

      eventSource.onerror = error => {
        this.zone.run(() => {
          observer.error(error);
        });
      };
    });
  }

  private getEventSource(url): EventSource {
    return new EventSource(url);
  }
}
