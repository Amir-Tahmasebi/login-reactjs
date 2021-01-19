import React, { useReducer, useContext } from "react";
import { initialState, reducer } from "./reducer";
const AuthStateContext = React.createContext();
const AuthDispatcherContext = React.createContext();

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState most be used with a AuthProvider");
  }
  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatcherContext);
  if (!context) {
    throw new Error("useAuthDispatch most be used with a AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatcherContext.Provider value={dispatch}>
        {children}
      </AuthDispatcherContext.Provider>
    </AuthStateContext.Provider>
  );
}
