import React, { useContext } from "react";
import HomeSvg from "../assets/HomeSvg.svg";
import {Link} from 'react-router-dom'
import {Context} from '../main'

const HomePage = () => {
  const {isAuthenticated}= useContext(Context)

  return (
    <div className="h-[500px] md:h-[615px] bg-[#118ab2] flex items-center justify-center">
      <div className="pt-24 md:pt-0">
        <img src={HomeSvg} alt="HomeSvg" />
        <div className="sm:hidden">
        <br />
        <br />
        </div>
        <Link
        to={
          isAuthenticated ? "/home" : "/signup"
        }
        className="py-2 px-6 border-2 mt-10 ml-20 
        md:ml-[300px] rounded-md text-white bg-pink-500">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
