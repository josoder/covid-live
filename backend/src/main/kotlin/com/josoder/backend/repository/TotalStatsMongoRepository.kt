package com.josoder.backend.repository

import com.josoder.backend.model.TotalStats
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono

@Repository
interface TotalStatsMongoRepository : ReactiveMongoRepository<TotalStats, ObjectId> {
    fun existsByUpdatedGreaterThanEqual(updated: Long): Mono<Boolean>
}
