import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import NavBar from "./components/NavBar";

import Games from "./components/Games";
import Loginpage from "./pages/Loginpage";
import Userpage from "./pages/Userpage";
import Gamepage from "./pages/Gamepage";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="container">
      <Suspense fallback={<p>Loading...</p>}>
        <NavBar />
        <Routes>
          {/* <Route path="/" element={<Navigate replace to="/games" />} /> */}
          {/* <Route path="/games" element={<Games />} /> */}
          <Route path="/gamepage" element={<Gamepage />} />
          <Route path="/home" element={<Homepage />} />
          {/* <Route path="/favourites" element={<Favourites id={currentList} />} /> */}
          {/* <Route path="/user" element={<Userpage />} /> */}
          {/* <Route path="/login" element={<Loginpage />} /> */}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
