import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryStats } from '../../../feature/stats/model/country-stats';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() countryStatsInput$: Observable<CountryStats[]>;
  @Output() countryClickedEmitter = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onClicked(countryStats: CountryStats) {
    this.countryClickedEmitter.emit(countryStats);
    this.router.navigate(['stats', countryStats.country]);
  }
}
