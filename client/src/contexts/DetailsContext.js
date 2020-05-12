import React, { createContext, useReducer } from "react";

import { detailsReducer } from "../reducers/DetailsReducer";
export const DetailsContext = createContext();

function DetailsContextProvider(props) {
  const [selectedDetails, dispatchSelectedDetails] = useReducer(
    detailsReducer,
    { selected: null, selectedType: null }
  );

  return (
    <DetailsContext.Provider
      value={{ selectedDetails, dispatchSelectedDetails }}
    >
      {props.children}
    </DetailsContext.Provider>
  );
}

export default DetailsContextProvider;
