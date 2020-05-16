package com.josoder.backend.model

data class HistoricalCountryStatsDTO(val country: String,
                                     val timeline: HistoricalStats)

data class HistoricalStats(
        val cases: Map<String, Long>,
        val recovered: Map<String, Long>,
        val deaths: Map<String, Long>,
        val active: MutableMap<String, Long> = mutableMapOf()) {
    suspend fun calcActive() {
       cases.forEach { active[it.key] = cases.getOrDefault(it.key, 0) -
               recovered.getOrDefault(it.key, 0) - deaths.getOrDefault(it.key, 0) }
    }
}
