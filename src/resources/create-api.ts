import axiosIns from "./axios";

export const api = axiosIns({
  baseURL: process.env.NODE_ENV === "production" ? "/" : "https://www.domain.com/api",
});

export const apiVerify = axiosIns({
  baseURL: process.env.NODE_ENV === "production" ? "/" : "https://www.domain.com/api",
  loading: false
});
