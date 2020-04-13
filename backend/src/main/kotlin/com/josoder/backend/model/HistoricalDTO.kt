package com.josoder.backend.model

data class HistoricalCountryStatsDTO (val country: String,
                     val timeline: HistoricalStats)

data class HistoricalStats (val cases: Map<String, Long>,
                       val recovered: Map<String, Long>,
                       val deaths: Map<String, Long>)
