export class TotalStats {
  deaths: number;
  updated: number;
  cases: number;
  recovered: number;
  active: number;

  constructor(recovered?: number, active?: number, deaths?: number, updated?: number, cases?: number) {
    this.recovered = recovered;
    this.active = active;
    this.deaths = deaths;
    this.updated = updated;
    this.cases = cases;
  }
}
