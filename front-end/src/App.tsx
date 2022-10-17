import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUp } from "./pages";
import "./index.scss";

function App() {
  return (
    <div className="wrapper-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
