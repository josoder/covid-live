import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryStats } from '../../../feature/stats/model/country-stats';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() countryStatsInput$: Observable<CountryStats[]>;
  @Output() countryClickedEmitter = new EventEmitter();
  countryControl = new FormControl();
  filteredCountries: Observable<CountryStats[]>;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.filteredCountries = this.countryControl.valueChanges
      .pipe(
        startWith(''),
        switchMap((filter) => {
          return this.countryStatsInput$.pipe(
            map(countries => countries.filter(x => x.country.toLowerCase().includes(filter.toLowerCase()))));
        }));
  }

  countrySelected(countryStats: CountryStats) {
    this.countryClickedEmitter.emit(countryStats);
    this.router.navigate(['stats', countryStats.country]);
  }
}
