import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query user($username: String!) {
    user(username: $username) {
        _id
        username
        email
        book {
            bookId
            title
        }
    }
}
`