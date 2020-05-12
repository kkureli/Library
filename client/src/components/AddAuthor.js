import React, { useState } from "react";
import { addAuthorMutation, getAuthorsQuery } from "../queries/queries";
import { graphql } from "react-apollo";
import { compose } from "redux";

function AddAuthor(props) {
  const [authorName, setAuthorName] = useState("");
  const [authorAge, setAuthorAge] = useState(null);

  const { addAuthorMutation } = props;

  const onSubmit = (e) => {
    e.preventDefault();
    addAuthorMutation({
      variables: {
        name: authorName,
        age: parseInt(authorAge),
      },
      refetchQueries: [{ query: getAuthorsQuery }],
    });
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} id="add-book">
        Add new Author
        <div className="field">
          <label>Author name:</label>
          <input
            required
            onChange={(e) => setAuthorName(e.target.value)}
            type="text"
          />
        </div>
        <div className="field">
          <label>Age:</label>
          <input
            required
            onChange={(e) => setAuthorAge(e.target.value)}
            type="number"
          />
        </div>
        <button>+</button>
      </form>
    </div>
  );
}

export default graphql(addAuthorMutation, {
  name: "addAuthorMutation",
})(AddAuthor);
