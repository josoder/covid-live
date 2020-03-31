package com.josoder.backend.service

import com.josoder.backend.repository.StatsRemoteRepository
import com.josoder.backend.repository.TotalStatsMongoRepository
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import kotlinx.coroutines.reactive.asFlow
import kotlinx.coroutines.reactive.awaitSingle
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.reactive.function.client.WebClientResponseException
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId

@Service
class TotalStatsService(private val totalStatsMongoRepository: TotalStatsMongoRepository,
                        private val totalStatsRemoteRepository: StatsRemoteRepository) {
    companion object {
        val LOG = LoggerFactory.getLogger(this::class.java)
        const val FETCH_INTERVAL: Long = 2 * (60 * 1_000)
    }

    @Scheduled(fixedRate = FETCH_INTERVAL)
    fun getTotalStats() = GlobalScope.launch {
        val stats = totalStatsRemoteRepository.getCurrentTotal()

        LOG.debug("new stats fetched at ${LocalDateTime.now()}:  $stats")

        totalStatsMongoRepository.existsByUpdatedGreaterThanEqual(stats.updated).asFlow()
                .collect { exists ->
                    if (!exists) {
                        totalStatsMongoRepository.insert(stats.convertToEntity()).awaitSingle()
                        LOG.info("stats was updated at: ${Instant.ofEpochMilli(stats.updated)
                                .atZone(ZoneId.systemDefault())}")
                    }
                }
    }

    @ExceptionHandler(WebClientResponseException::class)
    suspend fun handleClientException(ex: WebClientResponseException) {
        LOG.error("WebClient error, Status: ${ex.rawStatusCode}, Body: ${ex.responseBodyAsString}, $ex")
    }
}
