import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";
import { connect } from "react-redux"; //tek query kullandigin zaman connecte gerek yok

function BookDetails(props) {
  const displayBookDetails = () => {
    const { book } = props.data;
    if (book) {
      return (
        <div>
          <h2>Name:{book.name}</h2>
          <p>Genre:{book.genre}</p>
          <p>Author Name:{book.author.name}</p>
          <p>All books by this author: </p>
          <ul className="other-books">
            {book.author.books.map((authorsBook) => {
              return <li>{authorsBook.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <p>To see details of books please click book's name from left.</p>;
    }
  };
  return (
    <div id="book-details">
      <p>Output book details here</p>
      {displayBookDetails()}
    </div>
  );
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.selected,
      },
    };
  },
})(BookDetails);
