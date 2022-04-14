import APIKit, { setClientToken } from "./apiKit";
import localStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

import * as settings from "../config/settings";
const apiEndPoint = "users";

export async function logIn(email, password) {
  try {
    let result = await APIKit.post("/users/authenticate", {
      username: email,
      password: password,
    });

    //console.info("totken...", await localStorage.getItem("token"));
    console.info(result.token);
    await localStorage.setItem(settings.tokenKey, JSON.stringify(result.token));
    setClientToken(result.token);
    return true;
  } catch (e) {
    return false;
  }
}

export async function logInClientToken() {
  try {
    const token = await localStorage.getItem(settings.tokenKey);
    setClientToken(token);
  } catch (e) {}
}

export async function Test() {
  const response = await APIKit.get("/users/test");
  console.log(response.data);
}

export async function getCurrentUser() {
  try {
    const jwt = await localStorage.getItem(settings.tokenKey);

    const decoded = jwtDecode(jwt);
    //console.info("token: ", jwt, decoded);

    let user = decoded.sub;
    if (user.role === "user" || user.role === "admin") {
      user.AllowEdits = true;
      user.loggedIn = true;
    } else {
      user.loggedIn = false;
      user.AllowEdits = false;
    }
    return user;
  } catch (ex) {
    console.info("No token");
    const user = {
      id: 0,
      firstName: "guest",
      lastName: "guest",
      role: "guest",
      AllowEdits: false,
      loggedIn: false,
    };
    return user;
  }
}

export function register(user) {
  return APIKit.post(`${apiEndPoint}/register`, {
    username: user.username,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  });
}

export async function update(user) {
  await APIKit.put(`${apiEndPoint}/${user.id}`, {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  });
  //await login(user.username, user.password);
}

export function updatePassword(id, password) {
  return APIKit.put(`${apiEndPoint}/${id}`, {
    password: password,
  });
}
