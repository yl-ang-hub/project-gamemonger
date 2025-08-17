import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import NavBar from "./components/NavBar";
import Favourites from "./components/Favourites";
import Games from "./components/Games";
import Loginpage from "./pages/Loginpage";
import Userpage from "./pages/Userpage";

function App() {
  return (
    <div className="container">
      <Suspense fallback={<p>Loading...</p>}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/games" />} />
          <Route path="/games" element={<Games />} />
          {/* <Route path="/favourites" element={<Favourites id={currentList} />} /> */}
          <Route path="/user" element={<Userpage />} />
          {/* <Route path="/login" element={<Loginpage />} /> */}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
