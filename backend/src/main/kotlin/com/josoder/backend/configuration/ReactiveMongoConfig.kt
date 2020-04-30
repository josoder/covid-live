package com.josoder.backend.configuration

import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoClients
import org.springframework.boot.autoconfigure.mongo.MongoProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories

@EnableReactiveMongoRepositories
@EnableConfigurationProperties(MongoProperties::class)
class ReactiveMongoConfig(val properties: MongoProperties)
    : AbstractReactiveMongoConfiguration() {


    override fun reactiveMongoClient(): MongoClient {
        return if (properties.uri != null) {
            MongoClients.create(properties.uri)
        } else {
            MongoClients.create()
        }
    }

    override fun getDatabaseName(): String {
        return properties.database
    }

    override fun reactiveMongoTemplate() =
            ReactiveMongoTemplate(reactiveMongoClient(), databaseName)

    override fun getInitialEntitySet(): MutableSet<Class<*>> {
        return super.getInitialEntitySet()
                .filter {
                    !it.name.contains("CountryStats")
                }.toMutableSet()
    }
}
