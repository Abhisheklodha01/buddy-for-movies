import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import PlayList from "./components/PlayList";
import { useContext, useEffect } from "react";
import { Context } from "./main";
import axios from "axios";
import { server } from "./utils/constants.js";
import UserProfile from "./components/UserProfile.jsx";

function App() {
  const { isAuthenticated, setUser, setIsAuthenticated } = useContext(Context);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const FetchUserDetails = async () => {
      const { data } = await axios.get(`${server}/users/getprofile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data.user);
      setIsAuthenticated(true);
    };

    FetchUserDetails();
  }, [isAuthenticated]);

  useEffect(() => {
    const clearLocalStorageAfterDelay = () => {
      const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("fullName");
        localStorage.removeItem("email");
        localStorage.removeItem("userId");
      }, twentyFourHoursInMilliseconds);
    };

    clearLocalStorageAfterDelay();

    return () => clearTimeout(clearLocalStorageAfterDelay);
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/playlist" element={<PlayList />} />
          <Route path="/user" element={<UserProfile />} />
          <Route />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
