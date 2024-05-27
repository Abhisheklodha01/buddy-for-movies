import express from "express";
import {
  getMovieDescription,
  searchMoviecontroller,
  suggestedMoviescontroller,
  suggestedMoviescontroller2,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/search", searchMoviecontroller);
router.get("/getmovies", suggestedMoviescontroller);
router.get("/getmovies2", suggestedMoviescontroller2);
router.get("/getmovies3", suggestedMoviescontroller2);
router.post("/getdetail", getMovieDescription);

export default router;
