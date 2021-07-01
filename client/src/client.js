import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import {setContext} from 'apollo-link-context'
import gql from 'graphql-tag'

//Schema type definition
const typeDefs = gql`
extend type User {
    age: Int
}

extend type Pet {
    vaccinated: Boolean
}

`

const resolvers = {
    User: {
        age() {
            return 35
        }
    },
    Pet: {
        vaccinated() {
            return true
        }
    }
}

//Link pointing to the server.
const link = new HttpLink({ uri: 'http://localhost:4000/' });

//optimistic UI avoids delay
const delay = setContext(
    request =>
        new Promise((success, fail) => {
            setTimeout(() => {
                success()
            }, 800)
        })
)

const link = ApolloLink.from([
    delay,
    http
])

const cache = new InMemoryCache()

//TODO Added fragments causing an error === utf8 pathRelated
const client = new ApolloClient({
    link,
    cache,
    resolvers,
    typeDefs
});

export default client
