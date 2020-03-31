package com.josoder.backend

import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.reactive.asFlow
import kotlinx.coroutines.runBlocking
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.event.ApplicationStartedEvent
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.event.EventListener
import org.springframework.data.mongodb.core.CollectionOptions
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.stereotype.Component
import org.springframework.web.reactive.config.CorsRegistry
import org.springframework.web.reactive.config.EnableWebFlux
import org.springframework.web.reactive.config.WebFluxConfigurer
import org.springframework.web.reactive.function.client.WebClient

@SpringBootApplication
@EnableScheduling
class BackendApplication

fun main(args: Array<String>) {
    runApplication<BackendApplication>(*args)
}

@Configuration
class Config {
    @Bean
    fun webClient() = WebClient.create()
}

@Configuration
@EnableWebFlux
class CorsGlobalConfig: WebFluxConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("*")
    }
}

@Component
class DbSetup(val reactiveMongoTemplate: ReactiveMongoTemplate) {
    @EventListener(ApplicationStartedEvent::class)
    fun init() = runBlocking {
        reactiveMongoTemplate.collectionExists("totalstats").asFlow().collect {
            if (!it) {
                reactiveMongoTemplate.createCollection("totalstats",
                        CollectionOptions.empty().capped().size(1024).maxDocuments(10_000))
            }
        }
    }

}

