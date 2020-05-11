import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList(props) {
  const [selected, setSelected] = useState(null);
  const data = props.data;

  if (!data.loading) {
    return (
      <div>
        <ul id="book-list">
          {data.books &&
            data.books.map((book) => {
              return (
                <li onClick={() => setSelected(book.id)} key={book.id}>
                  {book.name}
                </li>
              );
            })}
        </ul>
        <BookDetails selected={selected}></BookDetails>
      </div>
    );
  } else {
    return <h1>Books Loading...</h1>;
  }
}

export default graphql(getBooksQuery)(BookList);
