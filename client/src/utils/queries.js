import { gql } from "@apollo/client";

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
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      savedBooks {
        authors
        bookId
        description
        title
        image
      }
    }
  }
`;

export const QUERY_ME = gql`
{
    me {
      _id
      username
      email
      savedBooks {
        authors
        bookId
        description
        title
        image
      }
    }
  }
`
