import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { server } from "../utils/constants.js";
import { useNavigate } from "react-router-dom";
import LoaderSvg from "../assets/loader.svg";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.put(
        `${server}/users/forgotpassword`,
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
      toast.success(data.message, {
        position: "top-center",
      });
      navigate("/login");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.message, {
        position: "top-center",
      });
      setLoading(false);
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
          Forgot Password
        </h1>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col  justify-between ">
            <label htmlFor="fullName">Email:</label>
            <input
              type="text"
              placeholder="enter your email"
              className="outline-none rounded-md py-2 pl-4 px-20 bg-[#9e796b] mt-1 mb-5"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label htmlFor="fullName">Password:</label>
            <input
              type="text"
              placeholder="Enter your password"
              className="outline-none rounded-md py-2 pl-4 px-20 bg-[#9e796b] mt-1"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
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
                  className="ml-8 py-2 px-10 bg-gradient-to-r
                  from-blue-600 to-sky-600 rounded-lg mt-5"
                >
                  Change Password
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
