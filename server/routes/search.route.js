import express from 'express'
import { searchMoviecontroller, suggestedMoviescontroller } from '../controllers/search.controller.js'

const router = express.Router()

router.get("/search", searchMoviecontroller)
router.get("/getmovies", suggestedMoviescontroller)

export default router