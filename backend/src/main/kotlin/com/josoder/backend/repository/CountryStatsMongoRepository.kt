package com.josoder.backend.repository

import com.josoder.backend.model.CountryStats
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.data.mongodb.repository.Tailable
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Repository
interface CountryStatsMongoRepository : ReactiveMongoRepository<CountryStats, String> {
    fun existsByCountryAndUpdatedGreaterThanEqual(country: String, updated: Long): Mono<Boolean>
    @Tailable
    fun findAllBy(): Flux<CountryStats>
}
