import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            email
        }
    }
}
`

export const ADD_BOOK = gql`
mutation addBook($bookId: ID, $title: String, $description: String ) {
    addBook(bookId: $bookId, title: $title, description: $description) {
        _id
        savedBooks {
            title
            authors
            description
            bookId
            image
        }
    }
}


`