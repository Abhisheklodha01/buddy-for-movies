import express from 'express'
import { searchMoviecontroller } from '../controllers/search.controller.js'

const router = express.Router()

router.get("/search", searchMoviecontroller)

export default router