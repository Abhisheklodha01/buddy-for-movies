// SignUp.js
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { server } from "../utils/constants.js";
import { Context } from "../main.jsx";
import LoaderSvg from "../assets/loader.svg";

const SignUp = () => {
  const { setIsAuthenticated } = useContext(Context);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/users/signup`,
        {
          fullName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      setLoading(false);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("fullName", data.user.fullName);
      localStorage.setItem("Email", data.user.email);
      navigate("/home");
      toast.success(data.message, {
        position: "top-center",
      });
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div
      className="md:min-h-screen flex items-center justify-center 
    bg-[#d5a1a1] text-gray-50"
    >
      <div
        className="bg-[#67473f] p-8 mb-5 md:mb-10 md:p-16
     md:pt-8 md:pb-8 rounded-lg mt-14 md:mt-0 mr-6 ml-5"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          Welcome to BUDDY-FOR-MOVIES
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col  justify-between ">
            <label htmlFor="fullName" className="mt-5">
              FullName:
            </label>
            <input
              type="text"
              placeholder="enter your fullname"
              className="outline-none rounded-md py-2 pl-4 bg-[#9e796b] mt-1 mb-5"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            <label htmlFor="fullName">Email:</label>
            <input
              type="text"
              placeholder="enter your email"
              className="outline-none rounded-md py-2 pl-4 bg-[#9e796b] mt-1 mb-5"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label htmlFor="fullName">Password:</label>
            <input
              type="text"
              placeholder="Enter your password"
              className="outline-none rounded-md py-2 pl-4 bg-[#9e796b] mt-1"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <div className="flex mt-2 ">
              <p>
                Already have an account?
                <Link className="text-blue-400 ml-2" to="/login">
                  {" "}
                  Login Here
                </Link>
              </p>
            </div>
            <div>
              {loading ? (
                <img
                  src={LoaderSvg}
                  alt="loader..."
                  className="h-8 w-44 mt-5 ml-14 md:ml-24 rounded-lg"
                />
              ) : (
                <button
                  type="submit"
                  className="ml-3 py-2 px-[100px] md:px-44 bg-gradient-to-r
                         from-blue-600 to-sky-600 rounded-lg mt-5"
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
