package com.josoder.backend.repository

import com.josoder.backend.model.TotalStats
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository

@Repository
interface TotalStatsMongoRepository : ReactiveMongoRepository<TotalStats, ObjectId>


//@Component
//class Init(private val repo: TotalStatsMongoRepository) {
//    @EventListener(ApplicationStartedEvent::class)
//    fun createSomeShit() = runBlocking {
//        repo.save(TotalStats(123, 123, 123)).block()
//
//        println("hello world")
//
//        repo.findAll().asFlow().collect { stat -> println(stat.cases) }
//    }
//}
