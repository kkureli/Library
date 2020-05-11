import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBookQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

function BookList(props) {
  const data = props.data;

  if (!data.loading) {
    return (
      <div>
        <ul className="book-list">
          {data.books &&
            data.books.map((book) => {
              return <li>{book.name}</li>;
            })}
        </ul>
      </div>
    );
  } else {
    return <h1>Books Loading...</h1>;
  }
}

export default graphql(getBookQuery)(BookList);
