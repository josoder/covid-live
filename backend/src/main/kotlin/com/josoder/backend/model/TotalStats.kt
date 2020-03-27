package com.josoder.backend.model

import org.springframework.data.mongodb.core.mapping.Document

/**
 * Represents the total confirmed cases and deaths of covid-19 globally
 * Updated is an EPOCH timestamp
 */
@Document(collection = "totalstats")
class TotalStats(val cases: Long,
                 val deaths: Long,
                 val updated: Long)

data class TotalStatsDto(val cases: Long,
                         val deaths: Long,
                         val updated: Long) {
    fun convertToEntity() =
            TotalStats(cases = this.cases, deaths = this.deaths, updated = this.updated)

}
