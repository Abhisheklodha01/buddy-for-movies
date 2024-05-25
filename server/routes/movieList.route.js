import express from 'express'
import {isAuthenticated} from '../middlewares/auth.middleware.js'
import { createMovieListcontroller, getMovieListController } from '../controllers/movieList.controller.js'

const router = express.Router()

router.post("/createlist", isAuthenticated, createMovieListcontroller)
router.get("/getlist", isAuthenticated, getMovieListController)

export default router