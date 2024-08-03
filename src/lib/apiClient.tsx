import axios from "axios";
import { Redirect } from "expo-router";
import React from "react";

const axiosClient = axios.create({
  baseURL: `https://vinhtc3-001-site1.ftempurl.com`,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    let res = error.response;
    if (res.status === 429) {
      const retryAfter = res.headers['retry-after'] ? parseInt(res.headers['retry-after'], 10) : 1;
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      return axiosClient.request(error.config);
    }
    
    console.error("Looks like there was a problem. Status Code: " + res.status);
    return Promise.reject(error);
  }
);

export default axiosClient;
