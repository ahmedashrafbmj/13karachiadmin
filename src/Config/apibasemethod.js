import axios from "axios";
import baseurl from "../assets/baseurl/baseurl";

let apiHandle = axios.create({
  baseURL: baseurl.url,
});

let Get = (endPoint) => {
  // Get the token from local storage
  const token = localStorage.getItem("token");

  // Set the token in the request headers
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Make the GET request with the headers
  return apiHandle.get(endPoint, { headers });
};
let GetThePage = (endPoint, page) => {
  return apiHandle.get(`${endPoint}?page=${page}`);
};
let GetById = (endPoint, id) => {
  return apiHandle.get(`${endPoint}/${id}`);
};
let Post = (endPoint, body) => {
  return apiHandle.post(`${endPoint}`, body);
};
let Put = (endPoint, id, body) => {
  return apiHandle.put(`${endPoint}/${id}`, body);
};
let Delete = (endPoint, id) => {
  return apiHandle.delete(`${endPoint}/${id}`);
};
export { Get, GetThePage, GetById, Post, Put, Delete };
