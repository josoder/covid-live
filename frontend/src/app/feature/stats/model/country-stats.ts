export class CountryStats {
  public static readonly GLOBAL = 'global';
  country: string;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  updated: number;


  constructor(country?: string, cases?: number, todayCases?: number, deaths?: number, todayDeaths?: number,
              recovered?: number, active?: number, critical?: number, casesPerOneMillion?: number,
              deathsPerOneMillion?: number, updated?: number) {
    this.country = country;
    this.cases = cases;
    this.todayCases = todayCases;
    this.deaths = deaths;
    this.todayDeaths = todayDeaths;
    this.recovered = recovered;
    this.active = active;
    this.critical = critical;
    this.casesPerOneMillion = casesPerOneMillion;
    this.deathsPerOneMillion = deathsPerOneMillion;
    this.updated = updated;
  }
}
