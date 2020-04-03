# Covid-live

Covid-live is a reactive fullstack POC, that displays live COVID-19 stats.
<br>

## v1
### Features
<li> Live update of global stats </li>
<li> Drilldown with more specifics i.e cases today, cases per million etc... </li>


### Implementation
<li> Backend module (spring boot with kotlin, gradle, mongodb and webflux) implemented with coroutines using 
 router DSL </li>
<br>
<li> Frontend, Angular 9 </li>
<br>

### Setup
requirements: Angular cli, docker-compose, java 11

mongodb:
```docker-compose up -d```
<br>
backend:
```./gradlew :bootRun```
<br>
frontend:
```ng serve```

## API
```/stats/``` : get the global total infected, <br> 
```/stats/countries``` : get information per country, <br>
```/stats/countries/{country}``` : get info for the given country <br>
```/stats/watch/total``` : streams total stats as server sent events

source: 
https://github.com/NovelCOVID/API
