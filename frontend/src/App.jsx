import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import NavBar from "./components/NavBar";
import AuthCtx from "./context/authContext";
import ProtectedRouter from "./components/ProtectedRouter";

import Games from "./components/Games";
import Loginpage from "./pages/Loginpage";
import Userpage from "./pages/Userpage";
import Gamepage from "./pages/Gamepage";
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <div className="container">
      <Suspense fallback={<p>Loading...</p>}>
        <AuthCtx.Provider
          value={{
            accessToken,
            setAccessToken,
            username,
            setUsername,
            userId,
            setUserId,
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate to="/homepage" replace />} />
            <Route
              path="/gamepage"
              element={<Navigate to="/homepage" replace />}
            />
            {/* <Route path="/" element={<Navigate replace to="/games" />} /> */}
            {/* <Route path="/games" element={<Games />} /> */}
            <Route path="/gamepage/:rawgId" element={<Gamepage />} />
            <Route path="/homepage" element={<Homepage />} />
            {/* <Route path="/favourites" element={<Favourites id={currentList} />} /> */}
            <Route
              path="/user"
              element={
                <ProtectedRouter>
                  <Userpage />
                </ProtectedRouter>
              }
            />

            <Route path="/login" element={<Loginpage />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </AuthCtx.Provider>
      </Suspense>
    </div>
  );
}

export default App;
