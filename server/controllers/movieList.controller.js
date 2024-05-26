import MovieList from "../models/movieList.model.js";

export const createMovieListcontroller = async (req, res) => {
  const { poster, year, title } = req.body;
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
