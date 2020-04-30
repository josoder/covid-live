package com.josoder.backend

import com.josoder.backend.model.CountryStats
import kotlinx.coroutines.reactive.awaitFirstOrNull
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
import org.springframework.web.reactive.function.client.ClientResponse
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.server.ServerWebExchange
import org.springframework.web.server.WebFilter
import org.springframework.web.server.WebFilterChain
import reactor.core.publisher.Mono
import java.time.Duration

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
class CorsGlobalConfig : WebFluxConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200", "http://localhost:80", "http://localhost",
                "http://stats.josoder.se:3100")
                .allowedMethods("*")
    }
}

@Component
class DbSetup(val reactiveMongoTemplate: ReactiveMongoTemplate) {
    @EventListener(ApplicationStartedEvent::class)
    fun init() = runBlocking {
        reactiveMongoTemplate.dropCollection(CountryStats::class.java)
                .retryBackoff(10, Duration.ofMillis(100))
                .awaitFirstOrNull()

        reactiveMongoTemplate.createCollection(CountryStats::class.java,
                CollectionOptions.empty()
                        .capped()
                        .size(100_000)
                        .maxDocuments(500)).awaitFirstOrNull()
    }
}

/*
 * This is needed to make sure SSE is not buffered while proxied.
 */
@Component
class SSEHeaderFilter: WebFilter {
    override fun filter(exchange: ServerWebExchange, chain: WebFilterChain): Mono<Void> {
        exchange.response.headers.set("X-Accel-Buffering", "no")
        return chain.filter(exchange)
    }
}
