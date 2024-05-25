import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { server } from "../utils/constants.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../main.jsx";

const Home = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [suggestedresults, setsuggestedResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(Context);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(
        `${server}/movies/search?query=${query}`,
        {
          withCredentials: true,
        }
      );
      setResults(response.data.movies.Search);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const token = localStorage.getItem("token");
  const addToList = async (poster, year, title) => {
    try {
      const { data } = await axios.post(
        `${server}/movieslists/createlist`,
        {
          poster,
          year,
          title,
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
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/movies/getmovies`);
        setsuggestedResults(data.movies.Search);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (isAuthenticated === false) {
    navigate("/");
  }

  return (
    <div className="min-h-screen p-8 bg-gray-800 text-white">
      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="text"
          placeholder="Search Movies"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded-full bg-gray-500 outline-none mr-2"
        />
        <button
          type="submit"
          className="py-2 px-6 bg-blue-500 text-white rounded-md
           mt-5 ml-10 md:ml-0 md:mt-0"
        >
          Search
        </button>
      </form>
      <div>
        <h2 className="text-2xl mb-4">Search Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((movie) => (
            <div
              key={movie.imdbID}
              className="border bg-gray-600 pt-5 pb-2 pl-4 pr-4 rounded-lg"
            >
              <img
                src={movie.Poster}
                alt="poster"
                className="h-[300px] w-[400px] rounded-xl"
              />
              <div className="flex flex-row mt-3 text-xl">
                <h3 className="mr-5">Title: {movie.Title}</h3>
                <p>Released: {movie.Year}</p>
              </div>
              <button
                onClick={() => addToList(movie.Poster, movie.Year, movie.Title)}
                className="mt-5 py-2 px-6 bg-green-500 text-white rounded"
              >
                Add to List
              </button>
            </div>
          ))}
        </div>
      </div>
      {loading && (
        <div className="ml-[700px] mt-[100px]">
          <span className="loading loading-spinner loading-lg text-secondary"></span>
        </div>
      )}
      <div>
        <h2 className="text-2xl mb-8 mt-4 underline underline-offset-8">
          Suggested Movies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {suggestedresults.map((movie) => (
            <div
              key={movie.imdbID}
              className="border bg-gray-600 pt-5 pb-2 pl-4 pr-4 rounded-lg"
            >
              <img
                src={movie.Poster}
                alt="poster"
                className="h-[300px] w-[400px] rounded-xl"
              />
              <div className="flex flex-row mt-3 text-xl">
                <h3 className="mr-5">Title: {movie.Title}</h3>
                <p>Released: {movie.Year}</p>
              </div>
              <button
                onClick={() => addToList(movie.Poster, movie.Year, movie.Title)}
                className="mt-5 py-2 px-6 bg-green-500 text-white rounded"
              >
                Add to List
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
