import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../utils/constants.js";
import { toast } from "react-hot-toast";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [present, setPresent] = useState(false);
  const [movieid, setMovieid] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const { data } = await axios.post(
          `${server}/movies/getdetail`,
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
        setMovie(data.movie);
      } catch (error) {}
    };
    getMovieDetail();
  }, []);

  const token = localStorage.getItem("token");
  const addToList = async (poster, year, title, imdbId) => {
    try {
      const { data } = await axios.post(
        `${server}/movieslists/createlist`,
        {
          poster,
          year,
          title,
          imdbId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(data.message, {
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    const checkmovieIsInList = async () => {
      try {
        const { data } = await axios.post(
          `${server}/movies/checkmovie`,
          {
            imdbId: movieId,
          },
          {
            headers: {
              "Content-Length": "application/json",
            },
            withCredentials: true,
          }
        );
        if (data.success === true) {
          setPresent(true);
          setMovieid(data.movie);
        } else {
          setPresent(false);
        }
      } catch (error) {
        setPresent(false);
      }
    };
    checkmovieIsInList();
  }, []);

  const DeleteMovieFromList = async () => {
    try {
      const { data } = await axios.post(
        `${server}/movieslists/deletemovie`,
        {
          movieId: movieid._id,
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
      navigate("/playlist");
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white pb-20 md:pt-10">
      <div
        className="mt-10 flex justify-center items-center
       flex-col md:flex-row p-5 pt-10 bg-gray-600 rounded-lg ml-3 mr-3 md:ml-52 md:mr-44"
      >
        <img
          src={movie?.Poster}
          alt="poster"
          className="h-[400px] w-[500px] rounded-md md:ml-[-100px]"
        />
        <div className="md:ml-10 mt-5 md:mt-0  text-lg">
          <p>Title: {movie?.Title}</p>
          <p>Country: {movie?.Country}</p>
          <p>Language: {movie?.Language}</p>
          <p>Type: {movie?.Type}</p>
          <p>Genre: {movie?.Genre}</p>
          <p>Released: {movie?.Released}</p>
          <p>PlayTime: {movie?.Runtime}</p>
          <p>Actors: {movie?.Actors}</p>
          <p>Director: {movie?.Director}</p>
          <p>Writer: {movie?.Writer}</p>
          <p>Imdb Rating: {movie?.Rating}</p>
          <p>Imdb Votes: {movie?.Votes}</p>
          <div>
            {present === false ? (
              <button
                onClick={() =>
                  addToList(
                    movie?.Poster,
                    movie?.Released,
                    movie?.Title,
                    movieId
                  )
                }
                className="bg-green-600 rounded-md border-2
             border-green-600 pl-5 pr-5 mt-2 py-1"
              >
                Add To PlayList
              </button>
            ) : (
              <button
                onClick={DeleteMovieFromList}
                className="bg-green-600 rounded-md border-2
           border-green-600 pl-5 pr-5 mt-2 py-1"
              >
                Delete From PlayList
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
