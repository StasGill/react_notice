import {
  ADD_DRAWER,
  ADD_LIST,
  GET_LISTS,
  EDIT_DRAWER,
  CURRENT_LIST,
  UPDATE_LIST,
  DELETE_LIST,
} from "../constants/constants";
import * as api from "../api/index.js";

export const addDrawerAction = () => async (dispatch) => {
  dispatch({ type: ADD_DRAWER });
};

export const editDrawerAction = () => async (dispatch) => {
  dispatch({ type: EDIT_DRAWER });
};

export const addList = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addList(formData);
    dispatch({ type: ADD_LIST, data });
  } catch (error) {
    console.log(error);
  }
};

export const updateList = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateList(formData);

    dispatch({ type: UPDATE_LIST, data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteList = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteList(formData);

    dispatch({ type: DELETE_LIST, data });
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentList = (item) => async (dispatch) => {
  dispatch({ type: CURRENT_LIST, item });
};

export const getList = () => async (dispatch) => {
  try {
    const { data } = await api.getList();

    dispatch({ type: GET_LISTS, data });
  } catch (error) {
    console.log(error);
  }
};
