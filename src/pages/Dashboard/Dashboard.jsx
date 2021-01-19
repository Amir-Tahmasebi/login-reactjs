import React from "react";
import { actionTypes } from "../../Context/reducer";
import { useAuthDispatch } from "./../../Context/auth-context";
export default function Dashboard() {
  const dispatch = useAuthDispatch();
  const handleLogout = () => {
      dispatch({ type : actionTypes.LOGOUT, payload : { token : false } })
          localStorage.removeItem('token')
  };
  return (
    <>
      <h2> DashBoard </h2>
      <button onClick={handleLogout}> Logout </button>
    </>
  );
}
