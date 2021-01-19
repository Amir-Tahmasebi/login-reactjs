import React from 'react'
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard'
import { useAuthState } from "./Context/auth-context";
function App() {
  const { token } = useAuthState()
  return (
    <>
      { token ? <Dashboard /> : <Login />}
    </>
  );
}

export default App;
