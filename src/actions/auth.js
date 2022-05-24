import { AUTH, SET_ERROR } from "../constants/constants";
import * as api from "../api/index.js";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    history("/");
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.response.data.message });
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    history("/");
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.response.data.message });
    console.log(error);
  }
};
