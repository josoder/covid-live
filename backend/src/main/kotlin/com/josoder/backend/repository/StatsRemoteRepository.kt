package com.josoder.backend.repository

import com.josoder.backend.Constants.Companion.COUNTRIES
import com.josoder.backend.model.CountryStatsDTO
import com.josoder.backend.model.HistoricalCountryStatsDTO
import com.josoder.backend.model.HistoricalStats
import com.josoder.backend.model.TotalStatsDto
import kotlinx.coroutines.flow.asFlow
import org.springframework.http.MediaType.APPLICATION_JSON
import org.springframework.stereotype.Repository
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.awaitBody
import org.springframework.web.reactive.function.client.awaitExchange
import reactor.kotlin.core.publisher.toMono

@Repository
class StatsRemoteRepository(private val webClient: WebClient) {
    companion object {
        private const val ROOT_URL = "https://corona.lmao.ninja/v2"
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

    suspend fun getCurrentStatsCountries() =
            webClient.get()
                    .uri("$ROOT_URL/$COUNTRIES")
                    .awaitExchange().awaitBody<List<CountryStatsDTO>>()

    suspend fun getCurrentTotalInCountry(country: String) =
            webClient.get()
                    .uri("$ROOT_URL/$COUNTRIES/$country")
                    .awaitExchange().awaitBody<Map<String, Any>>()

    suspend fun getHistoricalStats(country: String) =
            webClient.get()
                    .uri("$ROOT_URL/historical/${country}")
                    .awaitExchange().awaitBody<HistoricalCountryStatsDTO>().timeline

    suspend fun getHistoricalTotal() =
            webClient.get()
            .uri("$ROOT_URL/historical/all")
            .awaitExchange().awaitBody<HistoricalStats>().also {
                        it.calcActive()
                    }

    suspend fun getHistoricalAllCountries() =
            webClient.get()
                    .uri("$ROOT_URL/v2/historical")
                    .awaitExchange().awaitBody<List<HistoricalCountryStatsDTO>>()
}
