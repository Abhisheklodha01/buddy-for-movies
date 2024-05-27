import MovieList from "../models/movieList.model.js";

export const createMovieListcontroller = async (req, res) => {
  const { poster, year, title, imdbId } = req.body;
  const userId = req.user._id;
  try {
    if (!poster || !title || !year) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const list = await MovieList.create({
      userId,
      poster,
      title,
      year,
      imdbId
    });

    return res.status(200).json({
      success: true,
      message: "Movie addedd in list successfully",
      list,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while creating a list",
    });
  }
};

export const getMovieListController = async (req, res) => {
  const userId = req.user._id;
  try {
    const lists = await MovieList.find({ userId });
    return res.status(200).json({
      success: true,
      message: "Movie list find successfully",
      lists,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while fetching movie list",
    });
  }
};


export const DeleteMovieFromList = async (req, res) => {
  const { movieId } = req.body
  try {
    await MovieList.findByIdAndDelete(movieId)
    return res.status(200).json({
      success: true,
      message: "Movie deleted from playlist"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "unable delete movie from playlist"
    })
  }
}
