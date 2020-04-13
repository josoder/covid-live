export class StatsTimeSeries {
  series: StatsEntry[];
  name: string;

  constructor(name: string, entries: [string, number][]) {
    this.name = name;
    this.series = entries.map(e => new StatsEntry(e));
  }
}

export class StatsEntry {
  name: Date;
  value: number;

  constructor([key, val]) {
    this.name = new Date(key);
    this.value = val;
  }
}

