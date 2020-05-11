import React, { useState } from "react";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";
import { graphql } from "react-apollo";
import { compose } from "redux";

function AddBook(props) {
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });
  const { loading, authors } = props.getAuthorsQuery;
  const { addBookMutation } = props;

  const onSubmit = (e) => {
    e.preventDefault();
    addBookMutation({
      variables: {
        name: newBook.name,
        genre: newBook.genre,
        authorId: newBook.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  const displayAuthors = () => {
    if (!loading) {
      return (
        authors &&
        authors.map((author) => {
          return (
            <option value={author.id} key={author.id}>
              {author.name}
            </option>
          );
        })
      );
    } else {
      return <option disabled>Loading Authors..</option>;
    }
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input
            required
            onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
            type="text"
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            required
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
            type="text"
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select
            onChange={(e) =>
              setNewBook({ ...newBook, authorId: e.target.value })
            }
          >
            <option>Select author</option>
            {displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    </div>
  );
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, {
    name: "addBookMutation",
  })
)(AddBook);
