import axios from "axios";
import { LOGIN_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data); //서버로 보냄

  //reducer로 보낸다
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
