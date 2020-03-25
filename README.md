# Covid-live

Covid-live is an experimental project using spring-boot reactive to display covid-19 stats.
<br>

##v1: basic setup <br>
v1. is only a basic setup.
The endpoints returns data directly from the source API without doing anything with the data.  
 
<li> Backend module (spring boot with webflux) implemented with coroutines using 
 router DSL </li>
<br>
<li> Angular project (just the shell, nothing implemented yet) </li>


####API
```/stats/``` : get the global total infected, <br> 
```/stats/countries``` : get information per country, <br>
```/stats/countries/{country}``` : get info for the given country

source: 
https://github.com/NovelCOVID/API
