package com.josoder.backend.service

import com.josoder.backend.model.TotalStats
import kotlinx.coroutines.flow.filterNotNull
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.reactive.asFlow
import org.springframework.data.mongodb.core.ChangeStreamOptions
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.data.mongodb.core.aggregation.Aggregation
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.stereotype.Service

@Service
class StatsWatch(private val reactiveMongoTemplate: ReactiveMongoTemplate) {

    fun getTotalStatsChangeStream() =
            reactiveMongoTemplate.changeStream("totalstats", changeStreamOptions(), TotalStats::class.java)
                    .asFlow()
                    .map { it.body }
                    .filterNotNull()


    private fun changeStreamOptions() = ChangeStreamOptions.builder()
            .filter(Aggregation.newAggregation(TotalStats::class.java,
                    Aggregation.match(
                            Criteria.where("operationType").`is`("insert")
                    )
            )).returnFullDocumentOnUpdate().build()
}
