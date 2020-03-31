import { Component, OnInit } from '@angular/core';

export const exampleData = [
  {
    "name": "Infected",
    "series": [
      {
        "name": "23/3 13.30",
        "value": 23
      },
      {
        "name": "23/3 13.35",
        "value": 100
      },
      {
        "name": "24/3 13.45",
        "value": 200
      },
    ]
  },
  {
    "name": "Deaths",
    "series": [
      {
        "name": "23/3 13.30",
        "value": 5
      },
      {
        "name": "23/3 13.35",
        "value": 25
      },
      {
        "name": "24/3 13.45",
        "value": 110
      },
    ]
  },
  {
    "name": "Recovered",
    "series": [
      {
        "name": "23/3 13.30",
        "value": 10
      },
      {
        "name": "23/3 13.35",
        "value": 50
      },
      {
        "name": "24/3 13.45",
        "value": 210
      },
    ]
  }
];

@Component({
  selector: 'app-total-stats',
  templateUrl: './total-stats.component.html',
  styleUrls: ['./total-stats.component.scss']
})
export class TotalStatsComponent implements OnInit {
  exampleData = exampleData;

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Cases';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
    Object.assign(this, {exampleData});
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
  }

}
