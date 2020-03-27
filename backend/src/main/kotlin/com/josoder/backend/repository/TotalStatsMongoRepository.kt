package com.josoder.backend.repository

import com.josoder.backend.model.TotalStats
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface TotalStatsMongoRepository : ReactiveMongoRepository<TotalStats, ObjectId>
