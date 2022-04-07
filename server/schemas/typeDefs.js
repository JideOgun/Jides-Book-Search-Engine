const {gql} = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String!
    email: String!
   
}


type Book {
    authors: String
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    books: [Book]
    user(username: String!): User
}

type Mutation {
    login(email: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!): User
}


`;


// exporting the typeDefs
module.exports = typeDefs;