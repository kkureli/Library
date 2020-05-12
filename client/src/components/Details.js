import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery, getAuthorQuery } from "../queries/queries";
import { compose } from "redux"; //tek query kullandigin zaman compose gerek yok

function Details(props) {
  console.log("props", props);

  const displayDetails = () => {
    const { book } = props.getBookQuery;
    const { author } = props.getAuthorQuery;

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
    } else if (author) {
      return (
        <div>
          <h2>Author Name:{author.name}</h2>
          <p>Age:{author.age}</p>
          <p>All books by this author: </p>
          <ul className="other-books">
            {author.books.map((book) => {
              return <li>{book.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return (
        <p>To see details of books or authors please click names from left.</p>
      );
    }
  };
  return (
    <div id="book-details">
      <p>Output details here</p>
      {displayDetails()}
    </div>
  );
}

export default compose(
  graphql(getBookQuery, {
    name: "getBookQuery",

    options: (props) => {
      return {
        variables: {
          id: props.selectedID,
        },
      };
    },
  }),
  graphql(getAuthorQuery, {
    name: "getAuthorQuery",
    options: (props) => {
      return {
        variables: {
          id: props.selectedID,
        },
      };
    },
  })
)(Details);
