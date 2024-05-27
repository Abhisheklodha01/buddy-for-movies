import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../utils/constants";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PlayList = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(Context);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/movieslists/getlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLists([...data.lists]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchLists();
  }, [refresh]);

  const DeleteMovieFromList = async (movieId) => {
    try {
      const { data } = await axios.post(
        `${server}/movieslists/deletemovie`,
        {
          movieId,
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
      setRefresh(!refresh);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
      setRefresh(!refresh);
    }
  };

  const getMovieDetail = (movieId) => {
    navigate(`/movieDetail/${movieId}`);
  };

  if (isAuthenticated === false) {
    navigate("/");
  }
  return (
    <div className="min-h-screen p-8 bg-gray-800 text-white">
      <h2 className="text-2xl mb-4 mt-4 underline underline-offset-8">
        Your PlayLists
      </h2>
      {loading && (
        <div className="ml-[700px] mt-[100px]">
          <span className="loading loading-spinner loading-lg text-secondary"></span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
        {lists.map((list) => (
          <div
            key={list._id}
            className="border bg-gray-600 pt-5 pb-2 pl-4 pr-4 rounded-lg"
          >
            <img
              src={list.poster}
              alt="poster"
              className="h-[300px] w-[400px]"
              onClick={() => getMovieDetail(list.imdbId)}
            />
            <div className="flex flex-row mt-3">
              <h3 className="text-xl">Title: {list.title}</h3>
              <h3 className="text-xl ml-5">Released: {list.year}</h3>
            </div>
            <button
              onClick={() => DeleteMovieFromList(list._id)}
              className="py-1 pl-3 pr-3 mt-3 rounded-md
               bg-green-600 border-2 border-green-600"
            >
              Delete From List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayList;
