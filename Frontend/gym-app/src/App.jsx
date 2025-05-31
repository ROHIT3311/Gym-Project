import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Input from "./components/common/Input";
import Register from "./components/login/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home_page/HomePage";
import Login from "./components/login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
