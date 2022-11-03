import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/Login/Login";
import { fetchUser, userAccessToken } from "./utils/fetchUser";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const accessToken = userAccessToken();
  useEffect(() => {
    if (!accessToken) {
      navigate("/login", { replace: true });
    } else {
      const [userInfo] = fetchUser();
      setUser(userInfo);
    }
  }, [accessToken]);

  return (
    <Routes>
      <Route path="/*" element={<HomePage user={user} />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
