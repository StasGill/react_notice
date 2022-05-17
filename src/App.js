import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth } from "./components/Auth/Auth";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Spinner } from "./components/Spinner/Spinner";
import "./styles.scss";

function App() {
  const { isLoading } = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth" exact element={<Auth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {isLoading && <Spinner />}
      </BrowserRouter>
    </>
  );
}

export default App;
