import React, { useContext } from "react";
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../queries/queries";
import { DetailsContext } from "../contexts/DetailsContext";

function AuthorsList(props) {
  const { dispatchSelectedDetails, selectedDetails } = useContext(
    DetailsContext
  );

  const { getAuthorsQuery } = props;

  if (!getAuthorsQuery.loading) {
    return (
      <div className="bookListDiv">
        <h1 style={{ textAlign: "center" }}>Authors</h1>
        <ul id="book-list">
          {getAuthorsQuery.authors &&
            getAuthorsQuery.authors.map((author) => {
              return (
                <li
                  onClick={() =>
                    dispatchSelectedDetails({
                      type: "CHANGE_SELECTED",
                      selected: author.id,
                      selectedType: "author",
                    })
                  }
                >
                  {author.name}
                </li>
              );
            })}
        </ul>
        {/* <BookDetails selected={selected}></BookDetails> */}
      </div>
    );
  } else {
    return <h1>Authors Loading...</h1>;
  }
}

export default graphql(getAuthorsQuery, { name: "getAuthorsQuery" })(
  AuthorsList
);
