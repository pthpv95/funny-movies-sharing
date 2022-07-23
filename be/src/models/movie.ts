import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Movie = mongoose.model("movies", movieSchema)
export default Movie