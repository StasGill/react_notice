import axios from "axios";

const url = "http://localhost:5000/";

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signIn = (formData) => {
  return API.post("/user/signin", formData);
};

export const signUp = (formData) => {
  return API.post("/user/signup", formData);
};

export const addList = (formData) => {
  return API.post("/list", formData);
};

export const updateList = (formData) => {
  return API.patch("/list", formData);
};

export const deleteList = (formData) => {
  return API.delete(`/list/${formData.id}`, formData);
};

export const getList = () => {
  return API.get("/list");
};
