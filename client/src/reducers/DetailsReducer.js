import uuid from "uuid/v1";

export const detailsReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_SELECTED":
      return { selected: action.selected, selectedType: action.selectedType };
    default:
      return state;
  }
};
