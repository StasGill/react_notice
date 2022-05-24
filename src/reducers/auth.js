import { AUTH, LOGOUT, SET_ERROR } from "../constants/constants";

const authReducer = (state = { authData: null, error: "" }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.removeItem("profile");
      return { authData: null };
    case SET_ERROR:
      return { ...state, error: action?.error };
    default:
      return state;
  }
};

export default authReducer;
