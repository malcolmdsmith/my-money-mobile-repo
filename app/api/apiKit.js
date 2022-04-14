import axios from "axios";
import { logOut } from "../api/logOut";

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  //baseURL: "http://192.168.1.4:4000/api",
  baseURL: "http://my-recipes-13442.nodechef.com/api",
  timeout: 10000,
});

// APIKit.interceptors.response.use(function (response) {
//   return response.data;
// });

APIKit.interceptors.response.use(
  (response) => {
    //console.info("response...", response);
    return response.data;
  },
  (error) => {
    if (error.response.status) {
      if (error.response.status === 401) {
        //place your reentry code
        logOut();
        window.location = "/SignIn";
      }
    }
    return error;
  }
);

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token) => {
  delete axios.defaults.headers.common["Authorization"];
  const stripped = token.replace(/\"/g, "");
  APIKit.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${stripped}`;
    return config;
  });
};

export default APIKit;
