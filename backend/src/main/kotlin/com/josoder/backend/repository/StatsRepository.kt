package com.josoder.backend.repository

import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.runBlocking
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Repository
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.awaitBody
import org.springframework.web.reactive.function.client.awaitExchange
import com.josoder.backend.Constants.Companion.COUNTRIES

@Repository
class StatsRepository(private val webClient: WebClient) {
    companion object {
        private const val ROOT_URL = "https://corona.lmao.ninja"
    }

//    @EventListener(ApplicationReadyEvent::class)
//    fun init () = runBlocking{
//        while (true) {
//            delay(5 * 1000)
//            println("current total:")
//            println(getCurrentTotal())
//
//            println("total p. country:")
//            println(getCurrentTotalCountries())
//        }
//    }

    suspend fun getCurrentTotal() =
            webClient.get()
                    .uri("$ROOT_URL/all")
                    .awaitExchange().awaitBody<Map<String, Long>>()

    suspend fun getCurrentTotalCountries() =
            webClient.get()
                    .uri("$ROOT_URL/$COUNTRIES")
                    .awaitExchange().awaitBody<List<Map<String, Any>>>().asFlow()

    suspend fun getCurrentTotalInCountry(country: String) =
            webClient.get()
                    .uri("$ROOT_URL/$COUNTRIES/$country")
                    .awaitExchange().awaitBody<Map<String, Any>>()
}
