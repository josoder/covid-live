package com.josoder.backend.repository

import kotlinx.coroutines.flow.asFlow
import org.springframework.stereotype.Repository
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.awaitBody
import org.springframework.web.reactive.function.client.awaitExchange
import com.josoder.backend.Constants.Companion.COUNTRIES
import com.josoder.backend.model.TotalStats
import com.josoder.backend.model.TotalStatsDto
import org.springframework.http.MediaType
import org.springframework.http.MediaType.*

@Repository
class StatsRemoteRepository(private val webClient: WebClient) {
    companion object {
        private const val ROOT_URL = "https://corona.lmao.ninja"
    }

    suspend fun getCurrentTotal() =
            webClient.get()
                    .uri("$ROOT_URL/all")
                    .accept(APPLICATION_JSON)
                    .awaitExchange().awaitBody<TotalStatsDto>()

    suspend fun getCurrentTotalCountries() =
            webClient.get()
                    .uri("$ROOT_URL/$COUNTRIES")
                    .awaitExchange().awaitBody<List<Map<String, Any>>>().asFlow()

    suspend fun getCurrentTotalInCountry(country: String) =
            webClient.get()
                    .uri("$ROOT_URL/$COUNTRIES/$country")
                    .awaitExchange().awaitBody<Map<String, Any>>()
}
