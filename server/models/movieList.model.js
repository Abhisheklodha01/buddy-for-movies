import mongoose from "mongoose";

const MovieListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    movies: [
        {
            type: String
        }
    ],
    isPublic: {
        type: Boolean,
        default: false
    },
});
const MovieList = mongoose.model("MovieList", MovieListSchema);

export default MovieList