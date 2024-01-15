import "./index.css";
import { useState } from "react";

import Signup from "./Components/Signup/Signup";
import { AuthProvider } from "./Context/AuthContext";

import { Routes, Route } from "react-router-dom";

import Dashboard from "./Components/Dashboard/Dashboard";

import Login from "./Components/Login/Login";

import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import Modal from "./Components/Modal/Modal";

function App() {
  const [error, setError] = useState(false);

  return (
    <AuthProvider>
      {error && (
        <Modal isOpen={error} onClose={() => setError(false)}>
          {error}
        </Modal>
      )}
      {/* <NavBar>
        {" "}
        <GreetingLabel />
        <Logo />
        <LoginForm />{" "}
      </NavBar> */}
      <Routes>
        <Route
          path="/"
          element={<Login error={error} setError={(m) => setError(m)} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard error={error} setError={(m) => setError(m)} />}
        />
        <Route
          path="/update-profile"
          element={
            <UpdateProfile error={error} setError={(m) => setError(m)} />
          }
        />
        <Route
          path="/signup"
          element={<Signup error={error} setError={(m) => setError(m)} />}
        />
        <Route
          path="/login"
          element={<Login error={error} setError={(m) => setError(m)} />}
        />
        {/* // <Signup /> */}
        {/* <NavBar>
          <GreetingLabel />
          <Logo />
          <LoginForm />
          </NavBar>
          <Main>
          <BalanceRow />
          <Movements movements={user.movements} />
          <Summary />
        </Main> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
