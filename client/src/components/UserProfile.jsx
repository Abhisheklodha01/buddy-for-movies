import React, { useContext } from "react";
import { Context } from "../main";
import {useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  if (isAuthenticated === false) {
    navigate("/");
  }

  return (
    <div
      className="w-full h-full flex flex-col bg-gradient-to-b
     from-gray-700 to-gray-600 text-gray-200 items-center justify-center"
    >
      <div className="pb-24 pt-24">
        <p className="text-xl font-semibold">
          FullName: <span className="text-lg">{user?.fullName}</span>
        </p>
        <p className="text-xl font-semibold mt-2 mb-4">
          Email: <span className="text-lg">{user?.email}</span>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
