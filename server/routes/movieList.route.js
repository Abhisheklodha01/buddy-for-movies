import express from 'express'
import {isAuthenticated} from '../middlewares/auth.middleware.js'
import { DeleteMovieFromList, createMovieListcontroller, getMovieListController } from '../controllers/movieList.controller.js'

const router = express.Router()

router.post("/createlist", isAuthenticated, createMovieListcontroller)
router.get("/getlist", isAuthenticated, getMovieListController)
router.post("/deletemovie", DeleteMovieFromList)

export default router