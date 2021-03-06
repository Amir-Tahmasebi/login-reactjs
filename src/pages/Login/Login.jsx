import axios from "axios";
import React, { useState, useLayoutEffect, useEffect } from "react";
import Loading from "./../../Components/Loading";
import Error from "./../../Components/Error";
import { useAuthDispatch, useAuthState } from "../../Context/auth-context";
import "./style.css";
import * as actionCreator from './../../Context/action';

const fetchToken = async (username, password) => {
  return axios
    .post("http://localhost:3001/login", { username, password })
    .then((response) => response.data);
};
const fetchCurrentUserInfo = async (token) => {
  return axios
    .get("http://localhost:3001/users/me", {
      headers: {
        authorization: token,
      },
    })
    .then((response) => response.data);
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const dispatch = useAuthDispatch();
  const { loading, error } = useAuthState();

  const handlelogin = (e) => {
    e.preventDefault();
    dispatch( actionCreator.loginRequest() );
    fetchToken(username, password).then(({ success, data }) => {
      if (success) {
        setToken(data);
      }
      else{
        dispatch( actionCreator.loginError('failed login') );
      }
    });
  };
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch( actionCreator.loginRequest() );
      setToken(token);
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      fetchCurrentUserInfo(token).then(({ success, data }) => {
        if (success) {
          localStorage.setItem("token", token);
          dispatch( actionCreator.loginSuccess(data, token) );
        }
      });
    }
  }, [token, dispatch]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
         error ? <Error /> : 
        <div className="login">
          <h1>Login</h1>
          <form method="post" onSubmit={handlelogin}>
            <input
              value={username}
              type="text"
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
              required="required"
            />
            <input
              value={password}
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              required="required"
            />
            <button
              type="submit"
              className="btn btn-primary btn-block btn-large"
            >
              Let me in.
            </button>
          </form>
        </div>
        
      )}
    </>
  );
}
