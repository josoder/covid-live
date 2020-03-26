package com.josoder.backend.web

import com.josoder.backend.repository.StatsRemoteRepository
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.server.ServerRequest
import org.springframework.web.reactive.function.server.ServerResponse.*
import org.springframework.web.reactive.function.server.bodyAndAwait
import org.springframework.web.reactive.function.server.bodyValueAndAwait

@Component
class StatsHandler (private val repository: StatsRemoteRepository) {

    suspend fun getCurrentTotal(request: ServerRequest) =
            ok().bodyValueAndAwait(repository.getCurrentTotal())
    suspend fun getCurrentAllCountries(request: ServerRequest) =
            ok().bodyAndAwait(repository.getCurrentTotalCountries())
    suspend fun getCurrentInCountry(request: ServerRequest) =
            repository.getCurrentTotalInCountry(request.pathVariable("country")).let { ok().bodyValueAndAwait(it) }
}
