import { gql } from "apollo-boost";

export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
      books {
        name
      }
    }
  }
`;

export const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export const addAuthorMutation = gql`
  mutation($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      name
      age
    }
  }
`;

export const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export const getAuthorQuery = gql`
  query($id: ID) {
    author(id: $id) {
      name
      age
      books {
        name
      }
    }
  }
`;
