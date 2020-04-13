package com.josoder.backend.repository

import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface HistoricalStatsRepository: ReactiveMongoRepository<HistoricalStatsRepository, String>
