package com.josoder.backend.web

import com.josoder.backend.Constants.Companion.COUNTRIES
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.function.server.coRouter

@Configuration
class RouterConfiguration {

    @Bean
    fun routes(statsHandler: StatsHandler) = coRouter {
        "/api/stats".nest {
            GET("/", statsHandler::getCurrentTotal)
            GET("/$COUNTRIES", statsHandler::getCurrentAllCountries)
            GET("/$COUNTRIES/{country}", statsHandler::getCurrentInCountry)
            GET("/historical", statsHandler::getTotalHistorical)
            GET("/historical/{country}", statsHandler::getTotalHistorical)
            GET("/watch/total", statsHandler::watchTotalStats)
            GET("/watch/countries", statsHandler::watchCountries)
        }
    }
}
