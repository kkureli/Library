import React, { useContext } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import Details from "./Details";
import { DetailsContext } from "../contexts/DetailsContext";

function BookList(props) {
  const { dispatchSelectedDetails, selectedDetails } = useContext(
    DetailsContext
  );
  console.log("selected", selectedDetails);

  const data = props.data;

  if (!data.loading) {
    return (
      <div className="bookListDiv">
        <h1 style={{ textAlign: "center" }}>Books</h1>
        <ul id="book-list">
          {data.books &&
            data.books.map((book) => {
              return (
                <li
                  onClick={() =>
                    dispatchSelectedDetails({
                      type: "CHANGE_SELECTED",
                      selected: book.id,
                      selectedType: "book",
                    })
                  }
                  key={book.id}
                >
                  {book.name}
                </li>
              );
            })}
        </ul>
        <Details selectedID={selectedDetails.selected}></Details>
      </div>
    );
  } else {
    return <h1>Books Loading...</h1>;
  }
}

export default graphql(getBooksQuery)(BookList);
