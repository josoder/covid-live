package com.josoder.backend.web

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.function.server.coRouter
import com.josoder.backend.Constants.Companion.COUNTRIES

@Configuration
class RouterConfiguration {

    @Bean
    fun routes(statsHandler: StatsHandler) = coRouter {
        "/stats".nest {
            GET("/", statsHandler::getCurrentTotal)
            GET("/$COUNTRIES", statsHandler::getCurrentAllCountries)
            GET("/$COUNTRIES/{country}", statsHandler::getCurrentInCountry)
        }
    }
}
