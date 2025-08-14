import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import NavBar from "./components/NavBar";
import Favourites from "./components/Favourites";
import Login from "./components/Login";
import Games from "./components/Games";

function App() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/games" />} />
          <Route path="/games" element={<Games />} />
          <Route path="/favourites" element={<Favourites id={currentList} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
