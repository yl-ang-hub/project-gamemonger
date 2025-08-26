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
import SearchGames from "./pages/SearchGames";
import CartPage from "./pages/CartPage";
import { useMutation } from "@tanstack/react-query";
import useFetch from "./hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import CheckoutSuccess from "./components/CheckoutSuccess";

function App() {
  const fetchData = useFetch();
  const [accessToken, setAccessToken] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [cart, setCart] = useState([]);

  const refreshAccessToken = async () => {
    console.log("running");
    const res = await fetchData(`/auth/refresh`, "POST", {
      refresh: localStorage.getItem("refresh"),
    });
    return res;
  };

  const refreshMutate = useMutation({
    mutationFn: refreshAccessToken,
    onSuccess: (data) => {
      try {
        console.log("running");
        setAccessToken(data.access);
        const decoded = jwtDecode(data.access);
        if (decoded) {
          setUsername(decoded.username);
          setUserId(decoded.id);
        }
      } catch (e) {
        console.error(e.message);
      }
    },
  });

  useEffect(() => {
    // Auto login for users with refresh token in localStorage
    const refresh = localStorage.getItem("refresh");
    console.log(refresh);
    if (refresh && refresh !== "undefined") refreshMutate.mutate();
  }, []);

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
            cart,
            setCart,
          }}>
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
            <Route path="/search" element={<SearchGames />} />
            <Route path="/search/:query" element={<SearchGames />} />
            {/* <Route path="/favourites" element={<Favourites id={currentList} />} /> */}
            <Route
              path="/user"
              element={
                <ProtectedRouter>
                  <Userpage />
                </ProtectedRouter>
              }
            />
            {/* Hello World!!!! */}
            <Route path="/login" element={<Loginpage />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/cart"
              element={
                <ProtectedRouter>
                  <CartPage />
                </ProtectedRouter>
              }
            />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
          </Routes>
        </AuthCtx.Provider>
      </Suspense>
    </div>
  );
}

export default App;
