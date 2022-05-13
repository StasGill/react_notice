//

import { START_LOADING } from "../constants/constants";

const userReducer = (
  state = { isLoading: false, trend: {}, movie: {}, cast: {}, search: {} },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    default:
      return state;
  }
};

export default userReducer;
