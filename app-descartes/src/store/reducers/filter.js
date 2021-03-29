import { ADD_FILTER } from "../actionTypes.js";

const initialState = {
  filter: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_FILTER: {
      const { filter } = action.payload;
      return {
        filter: filter,
      };
    }
    default:
      return state;
  }
}
