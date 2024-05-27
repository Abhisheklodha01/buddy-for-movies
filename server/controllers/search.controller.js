import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const searchMoviecontroller = async (req, res) => {
  const { query } = req.query;
  try {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?s=${query}&apikey=${process.env.OMDB_API_KEY}`
    );
    return res.status(200).json({
      success: true,
      message: "Movie find successfully",
      movies: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error searching movies",
    });
  }
};

export const suggestedMoviescontroller = async (req, res) => {
  try {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=Bollywood&page=1`
    );

    return res.status(200).json({
      success: true,
      message: "Movie find successfully",
      movies: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error searching movies",
    });
  }
};

export const suggestedMoviescontroller2 = async (req, res) => {
  try {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=Bollywood&page=2`
    );

    return res.status(200).json({
      success: true,
      message: "Movie find successfully",
      movies: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error searching movies",
    });
  }
};

export const suggestedMoviescontroller3 = async (req, res) => {
  try {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=Bollywood&page=3`
    );

    return res.status(200).json({
      success: true,
      message: "Movie find successfully",
      movies: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error searching movies",
    });
  }
};

export const getMovieDescription = async (req, res) => {
  const { movieId } = req.body;
  try {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${movieId}`
    );
    const movie = {
      Actors: data.Actors,
      Title: data.Title,
      Country: data.Country,
      Released: data.Released,
      Poster: data.Poster,
      Language: data.Language,
      Rating: data.imdbRating,
      Votes: data.imdbVotes,
      Writer: data.Writer,
      Type: data.Type,
      Director: data.Director,
      Genre: data.Genre,
      Runtime: data.Runtime

    }
    return res.status(200).json({
      success: true,
      message: "Movie details find successfully",
      movie
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
