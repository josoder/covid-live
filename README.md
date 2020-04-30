# Covid-live

Covid-live is a reactive fullstack POC, that displays live COVID-19 stats.
<br>

### Features
<li> Live update of global stats </li>
<li> Drilldown per country with more specifics i.e cases today, cases per million etc... </li>
<br>

![v1_pic](/doc/v1_covid.png)

### Implementation
<li> Backend module: spring boot with kotlin, gradle, mongodb and webflux. Implemented with coroutines using 
 router DSL </li>
<br>
<li> Frontend: Angular 9 + angular material and ngx charts </li>
<br>

## Run
requirements: Angular cli, docker-compose, java 11

mongodb:
```docker-compose up mongo -d```
<br>
backend:
```./gradlew :bootRun```
<br>
frontend:
```ng serve```

## Docker compose
build image for backend:
```./gradlew jibDockerBuild --image=stats-backend```

The frontend build will be handled by docker-compose
```docker-compose up -d```

Frontend will be served at: ```localhost:80/```
<br> API: ```localhost:80/api```

## Kubernetes
Will provide more information on this setup ASAP.
<br>
Configuration is available under /kube

#### Mongo db
Runs a stateful set with 3 instances of mongodb replica sets.

#### Frontend
Build the image with ```/frontend/build_kube.sh```

#### Backend

## API
path: ```/api/stats``` 

```/``` : get the global total infected, <br> 
```/countries``` : get information per country, <br>
```/countries/{country}``` : get info for the given country <br>
```/watch/total``` : streams total stats as server sent events

source: 
https://github.com/NovelCOVID/API
