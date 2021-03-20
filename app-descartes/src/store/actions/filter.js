import { ADD_FILTER } from "../actionTypes";


export const setFilter = filter => {
  return({ type: ADD_FILTER, payload: { filter } })
};
