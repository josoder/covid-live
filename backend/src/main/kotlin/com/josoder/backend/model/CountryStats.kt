package com.josoder.backend.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document


@Document(collection = "countrystats")
class CountryStats(
        @Id
        val country: String,
        val cases: Long,
        val todayCases: Long,
        val deaths: Long,
        val todayDeaths: Long,
        val recovered: Long,
        val active: Long,
        val critical: Long,
        val casesPerOneMillion: Long,
        val deathsPerOneMillion: Long,
        val updated: Long)

data class CountryStatsDTO(val country: String,
                           val cases: Long,
                           val todayCases: Long,
                           val deaths: Long,
                           val todayDeaths: Long,
                           val recovered: Long,
                           val active: Long,
                           val critical: Long,
                           val casesPerOneMillion: Long,
                           val deathsPerOneMillion: Long,
                           val updated: Long) {
    fun convertToEntity(): CountryStats {
        return CountryStats(this.country, this.cases, this.todayCases, this.deaths, this.todayDeaths, this.recovered,
                this.active, this.critical, this.casesPerOneMillion, this.deathsPerOneMillion, this.updated)
    }
}
