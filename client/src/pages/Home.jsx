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
  const [suggestedresults2, setsuggestedResults2] = useState([]);
  const [suggestedresults3, setsuggestedResults3] = useState([]);
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
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/movies/getmovies2`);
        setsuggestedResults2(data.movies.Search);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/movies/getmovies3`);
        setsuggestedResults3(data.movies.Search);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const getMovieDetail = (movieId) => {
    navigate(`/movieDetail/${movieId}`);
  };

  if (isAuthenticated === false) {
    navigate("/");
  }

  return (
    <div className="min-h-screen p-8 bg-gray-800 text-white">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Search Movies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 border rounded-full bg-gray-500 outline-none mr-2 ml-[-20px]"
          />
          <button
            type="submit"
            className="py-2 md:px-6 px-4 bg-blue-500 text-white rounded-md"
          >
            Search
          </button>
        </div>
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
                onClick={() => getMovieDetail(movie.imdbID)}
              />
              <div className="flex flex-row mt-3 text-xl">
                <h3 className="mr-5">Title: {movie.Title}</h3>
                <p>Released: {movie.Year}</p>
              </div>
              <button
                onClick={() =>
                  addToList(movie.Poster, movie.Year, movie.Title, movie.imdbID)
                }
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
                onClick={() => getMovieDetail(movie.imdbID)}
              />
              <div className="flex flex-row mt-3 text-xl">
                <h3 className="mr-5">Type: {movie.Type}</h3>
                <p>Released: {movie.Year}</p>
              </div>
              <button
                onClick={() =>
                  addToList(movie.Poster, movie.Year, movie.Type, movie.imdbID)
                }
                className="mt-5 py-2 px-6 bg-green-500 text-white rounded"
              >
                Add to List
              </button>
            </div>
          ))}
          {suggestedresults2.map((movie) => (
            <div
              key={movie.imdbID}
              className="border bg-gray-600 pt-5 pb-2 pl-4 pr-4 rounded-lg"
            >
              <img
                src={movie.Poster}
                alt="poster"
                className="h-[300px] w-[400px] rounded-xl"
                onClick={() => getMovieDetail(movie.imdbID)}
              />
              <div className="flex flex-row mt-3 text-xl">
                <h3 className="mr-5">Type: {movie.Type}</h3>
                <p>Released: {movie.Year}</p>
              </div>
              <button
                onClick={() =>
                  addToList(movie.Poster, movie.Year, movie.Type, movie.imdbID)
                }
                className="mt-5 py-2 px-6 bg-green-500 text-white rounded"
              >
                Add to List
              </button>
            </div>
          ))}
          {suggestedresults3.map((movie) => (
            <div
              key={movie.imdbID}
              className="border bg-gray-600 pt-5 pb-2 pl-4 pr-4 rounded-lg"
            >
              <img
                src={movie.Poster}
                alt="poster"
                className="h-[300px] w-[400px] rounded-xl"
                onClick={() => getMovieDetail(movie.imdbID)}
              />
              <div className="flex flex-row mt-3 text-xl">
                <h3 className="mr-5">Type: {movie.Type}</h3>
                <p>Released: {movie.Year}</p>
              </div>
              <button
                onClick={() =>
                  addToList(movie.Poster, movie.Year, movie.Type, movie.imdbID)
                }
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
