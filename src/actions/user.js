import {
  ADD_DRAWER,
  ADD_LIST,
  GET_LISTS,
  EDIT_DRAWER,
  CURRENT_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_TASKS,
  CURRENT_DRAWER,
} from "../constants/constants";
import * as api from "../api/index.js";

//  ========================== Drawer and UI Actions ================

export const addDrawerAction = () => async (dispatch) => {
  dispatch({ type: ADD_DRAWER });
};

export const editDrawerAction = () => async (dispatch) => {
  dispatch({ type: EDIT_DRAWER });
};

export const currentListDrawerAction = () => async (dispatch) => {
  dispatch({ type: CURRENT_DRAWER });
};

export const setCurrentList = (item) => async (dispatch) => {
  dispatch({ type: CURRENT_LIST, item });
};

export const setCurrentList2 = (index) => async (dispatch) => {
  dispatch({ type: CURRENT_LIST, index });
};

//  ============================= List CRUD Actions =================

export const addList = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addList(formData);
    const lastIndex = data.length - 1;
    const item = data[lastIndex];

    dispatch({ type: ADD_LIST, data });
    dispatch({ type: CURRENT_LIST, item });
  } catch (error) {
    console.log(error);
  }
};

export const updateList = (formData, currentListId) => async (dispatch) => {
  try {
    const { data } = await api.updateList(formData);

    const currentList = data.find((item) => item._id === currentListId);

    dispatch({ type: UPDATE_LIST, data, currentList });
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

export const getList = (currentIdList) => async (dispatch) => {
  try {
    const { data } = await api.getList();
    const currentList = data.find((item) => item._id === currentIdList);
    dispatch({ type: GET_LISTS, data, currentList });
  } catch (error) {
    console.log(error);
  }

  // try {
  //   let updatedList;
  //   const { data } = await api.getList();
  //   if (currentList._id) {
  //     updatedList = data.find((item) => item._id === currentList._id);
  //     dispatch({ type: GET_LISTS, data, updatedList });
  //   } else {
  //     updatedList = data[0];
  //     dispatch({ type: GET_LISTS, data, updatedList });
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
};

//  ============================= Task CRUD Actions =================

export const addTask = (formData, currentListId) => async (dispatch) => {
  try {
    const { data } = await api.addTask(formData);
    const currentList = await data.find((item) => item._id === currentListId);
    dispatch({ type: ADD_TASK, data, currentList });
  } catch (error) {
    console.log(error);
  }
};

export const updateTask =
  (id, currentListId, updatedTask) => async (dispatch) => {
    try {
      const { data } = await api.updateTask(id, updatedTask);

      const currentList = await data.find((item) => item._id === currentListId);

      dispatch({ type: UPDATE_TASK, data, currentList });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteTask = (id, currentListId) => async (dispatch) => {
  try {
    const { data } = await api.deleteTask(id);

    const currentList = data.find((item) => item._id === currentListId);

    dispatch({ type: DELETE_TASK, data, currentList });
  } catch (error) {
    console.log(error);
  }
};

export const getTask = () => async (dispatch) => {
  try {
    const { data } = await api.getTasks();

    dispatch({ type: GET_TASKS, data });
  } catch (error) {
    console.log(error);
  }
};
