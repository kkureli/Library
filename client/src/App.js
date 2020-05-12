import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import AddAuthor from "./components/AddAuthor";
import AuthorsList from "./components/AuthorsList";
import DetailsContextProvider from "./contexts/DetailsContext";
import AddAuthorForm from "./components/AddAuthorForm";
import AddBookForm from "./components/AddBookForm";
//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <DetailsContextProvider>
        <div className="App">
          <h1>Kaan's Reading List</h1>
          <div style={{ display: "flex" }}>
            <BookList></BookList>
            <AuthorsList></AuthorsList>
          </div>

          <AddAuthorForm></AddAuthorForm>
          <AddBookForm></AddBookForm>
        </div>
      </DetailsContextProvider>
    </ApolloProvider>
  );
}

export default App;
