// SignIn.js
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { server } from "../utils/constants.js";
import { Context } from "../main.jsx";
import LoaderSvg from "../assets/loader.svg";


const SignIn = () => {
  const { setIsAuthenticated} = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
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
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div
      className=" md:min-h-screen flex items-center justify-center
    bg-[#d5a1a1] text-gray-50"
    >
      <div
        className="bg-[#67473f] p-8 mt-20 md:mt-0
      mb-10 md:p-16 md:pt-10 md:pb-12 rounded-lg  mr-6 ml-5"
      >
        <h1 className="text-2xl font-semibold text-center mb-8">
          Sign In To BUDDY-FOR-MOVIES
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col  justify-between ">
            <label htmlFor="fullName">Email:</label>
            <input
              type="email"
              placeholder="enter your email"
              className="outline-none rounded-md py-2 pl-4 bg-[#9e796b] mt-1 mb-5"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label htmlFor="fullName">Password:</label>
            <input
              type="text"
              placeholder="Enter your Password "
              className="outline-none rounded-md py-2 pl-4 bg-[#9e796b] mt-1"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <div className="flex mt-2 ">
              <p>
                Don't have an account <br />
                <Link className="text-blue-400" to="/signup">
                  {" "}
                  Sign up
                </Link>
              </p>
              <Link
                to={"/forgotpassword"}
                className="ml-5 md:ml-28 text-gray-100"
              >
                Fotgot password?
              </Link>
            </div>
            <div>
              {loading ? (
                <img
                  src={LoaderSvg}
                  alt="loader..."
                  className="h-8 w-44 mt-5 ml-4 md:ml-24 rounded-lg"
                />
              ) : (
                <button
                  type="submit"
                  className="ml-4 py-2 px-14 md:px-44 bg-gradient-to-r
                          from-blue-600 to-sky-600 rounded-lg mt-5"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
