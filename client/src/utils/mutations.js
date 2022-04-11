import { gql } from "@apollo/client";

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
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        _id
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $bookId: ID
    $title: String
    $description: String
    $authors: [String]
    $image: String
  ) {
    addBook(
      bookId: $bookId
      title: $title
      description: $description
      authors: $authors
      image: $image
    ) {
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
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID) {
    removeBook(bookId: $bookId) {
      _id
    }
  
    }
`;
