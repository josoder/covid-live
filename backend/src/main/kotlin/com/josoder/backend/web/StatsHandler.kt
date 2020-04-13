package com.josoder.backend.web

import com.josoder.backend.repository.CountryStatsMongoRepository
import com.josoder.backend.repository.StatsRemoteRepository
import com.josoder.backend.service.StatsWatch
import kotlinx.coroutines.reactive.asFlow
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.server.ServerRequest
import org.springframework.web.reactive.function.server.ServerResponse.ok
import org.springframework.web.reactive.function.server.bodyAndAwait
import org.springframework.web.reactive.function.server.bodyValueAndAwait
import org.springframework.web.reactive.function.server.sse

@Component
class StatsHandler(private val repository: StatsRemoteRepository,
                   private val statsWatch: StatsWatch,
                   private val countryRepo: CountryStatsMongoRepository) {

    suspend fun getCurrentTotal(request: ServerRequest) =
            ok().bodyValueAndAwait(repository.getCurrentTotal())

    suspend fun getCurrentAllCountries(request: ServerRequest) =
            ok().bodyAndAwait(repository.getCurrentTotalCountries())

    suspend fun getCurrentInCountry(request: ServerRequest) =
            repository.getCurrentTotalInCountry(request.pathVariable("country")).let { ok().bodyValueAndAwait(it) }

    suspend fun watchTotalStats(request: ServerRequest) =
            ok().sse().bodyAndAwait(statsWatch.getTotalStatsChangeStream())

    suspend fun watchCountries(request: ServerRequest) =
            ok().sse().bodyAndAwait(countryRepo.findAllBy().asFlow())

    suspend fun getTotalHistorical(request: ServerRequest) =
            ok().bodyValueAndAwait(repository.getHistoricalTotal())

    suspend fun getHistoricalCountry(request: ServerRequest) =
            repository.getHistoricalStats(request.pathVariable("country")).let { ok().bodyValueAndAwait(it) }
}
