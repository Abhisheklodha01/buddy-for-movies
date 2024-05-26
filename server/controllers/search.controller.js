import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()

export const searchMoviecontroller = async (req, res) => {
  const { query } = req.query;
  try {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?s=${query}&apikey=${process.env.OMDB_API_KEY}`
    );
    return res.status(200).json({
      success: true,
      message: "Movie find successfully",
      movies: data
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error searching movies"
    })
  }
};


export const suggestedMoviescontroller = async (req, res) => {
  try {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=Bollywood&page=1`
    )

    return res.status(200).json({
      success: true,
      message: "Movie find successfully",
      movies: data
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error searching movies"
    })
  }
}

export const suggestedMoviescontroller2 = async (req, res) => {
  try {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=Bollywood&page=2`
    )

    return res.status(200).json({
      success: true,
      message: "Movie find successfully",
      movies: data
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error searching movies"
    })
  }
}

export const suggestedMoviescontroller3 = async (req, res) => {
  try {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=Bollywood&page=3`
    )

    return res.status(200).json({
      success: true,
      message: "Movie find successfully",
      movies: data
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error searching movies"
    })
  }
}
