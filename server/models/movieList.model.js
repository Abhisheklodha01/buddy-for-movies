import mongoose from "mongoose";

const MovieListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    year: {
        type: String
    }
});
const MovieList = mongoose.model("MovieList", MovieListSchema);

export default MovieList