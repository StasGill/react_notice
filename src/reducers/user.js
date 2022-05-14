import {
  ADD_DRAWER,
  GET_LISTS,
  START_LOADING,
  EDIT_DRAWER,
  CURRENT_LIST,
  UPDATE_LIST,
  ADD_LIST,
  DELETE_LIST,
} from "../constants/constants";

const userReducer = (
  state = {
    isLoading: false,
    addDrawer: false,
    editDrawer: false,
    lists: [],
    currentList: { title: "", color: "", _id: "" },
  },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case ADD_DRAWER:
      return { ...state, addDrawer: !state.addDrawer };
    case EDIT_DRAWER:
      return { ...state, editDrawer: !state.editDrawer };
    case CURRENT_LIST:
      return { ...state, currentList: action?.item };
    case GET_LISTS:
      return { ...state, lists: action?.data };
    case ADD_LIST:
      return { ...state, lists: action?.data };
    case UPDATE_LIST:
      return { ...state, lists: action?.data };
    case DELETE_LIST:
      return { ...state, lists: action?.data };

    default:
      return state;
  }
};

export default userReducer;