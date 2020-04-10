package com.josoder.backend.configuration

import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoClients
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories

@EnableReactiveMongoRepositories
class ReactiveMongoConfig(@Value("\${spring.data.mongodb.database}") private val dbName: String)
    : AbstractReactiveMongoConfiguration() {


    override fun reactiveMongoClient(): MongoClient {
        return MongoClients.create()
    }

    override fun getDatabaseName(): String {
        return dbName
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
