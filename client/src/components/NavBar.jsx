import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../main";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const LogoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullName");
    setNav(false);
    setIsAuthenticated(false);
  };

  return (
    <div className="bg-[#fb6f92] h-20 flex justify-between items-center">
      <div>
        <h1 className="text-xl text-[#e3d5ca] ml-4">
          😜<span className="hidden md:inline">BUDDY-FOR-</span>MOVIES
        </h1>
      </div>
      <div className="hidden md:inline">
        {isAuthenticated ? (
          <div className="text-lg text-white mr-5 md:mr-10 flex justify-between items-center">
            <Link to={"/home"} className="mr-5 hover:text-xl">
              Home
            </Link>
            <Link to={"/playlist"} className="hover:text-xl">
              {" "}
              Your Playlist
            </Link>
            <div className="mr-5 ml-[450px] text-lg text-white">
              <Link
                to={"/user"}
                className="py-2 px-4 border-2 border-gray-300 rounded-lg"
              >
                Your Profile
              </Link>
              <Link
                to={"/"}
                className="ml-4 py-2 px-4 border-2 border-gray-300 rounded-lg"
                onClick={LogoutHandler}
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <div className="mr-5 text-lg text-white ">
            <Link
              to={"/login"}
              className="py-2 px-4 border-2 border-gray-300 rounded-lg"
            >
              Sign In
            </Link>
            <Link
              to={"/signup"}
              className="ml-4 py-2 px-4 border-2 border-gray-300 rounded-lg"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      <div className="md:hidden text-white">
        {isAuthenticated ? (
          <div>
            <Link to={"/home"} className="mr-5 hover:text-xl">
              Home
            </Link>
            <Link to={"/playlist"} className="hover:text-xl">
              {" "}
              Your Playlist
            </Link>
          </div>
        ) : (
          <div className="mr-5 text-lg text-white ">
            <Link
              to={"/login"}
              className="py-2 px-4 border-2 border-gray-300 rounded-lg"
            >
              Sign In
            </Link>
            <Link
              to={"/signup"}
              className="ml-4 py-2 px-4 border-2 border-gray-300 rounded-lg"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
      <div
        onClick={() => setNav(!nav)}
        className="md:hidden cursor-pointer pr-4 mt-4 z-20 text-white"
      >
        {nav ? (
          <FaTimes size={30} className="mr-40" />
        ) : (
          <FaBars size={30} className="mb-4" />
        )}
      </div>
      {nav ? (
        <div className=" flex flex-col bg-[#fb6f92] z-10">
          {isAuthenticated ? (
            <ul
              className="flex flex-col justify-center
                         items-center absolute top-0 left-0
                         w-full h-screen bg-[#fb6f92] text-white "
            >
              <div className="text-2xl text-center mb-5 font-bold">
                <li className="cursor-pointer ">
                  <Link
                    to={"/user"}
                    onClick={() => setNav(false)}
                    className="py-2 px-6 border-2 bg-[#d5a1a1] border-gray-300 rounded-lg text-xl"
                  >
                    My Profile
                  </Link>
                </li>
              </div>
              <li className="x-4 cursor-pointer capitalize py-6 text-4xl">
                <Link
                  className="py-2 px-10 border-2 bg-[#d5a1a1] border-gray-300 rounded-lg text-xl"
                  to="/"
                  onClick={LogoutHandler}
                >
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul
              className="flex flex-col justify-center
                        items-center absolute top-0 left-0
                        w-full h-screen bg-[#fb6f92] text-gray-200 "
            >
              <div className="text-2xl text-center mb-5 font-bold">
                <li className="cursor-pointer ">
                  <Link
                    to={"/signup"}
                    onClick={() => setNav(false)}
                    className="py-2 px-6 border-2 bg-[#d5a1a1] border-gray-300 rounded-lg text-xl"
                  >
                    Sign Up
                  </Link>
                </li>
                <li className="cursor-pointer mt-10 mb-10 ">
                  <Link
                    to={"/login"}
                    onClick={() => setNav(false)}
                    className="py-2 px-6 border-2 bg-[#d5a1a1] border-gray-300 rounded-lg text-xl"
                  >
                    Sign In
                  </Link>
                </li>
              </div>
            </ul>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NavBar;
