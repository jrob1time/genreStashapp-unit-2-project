import mongoose from 'mongoose'

const Schema = mongoose.Schema

const genreSchema = new Schema({
  name: String,
  locationOrigin: String,
  yearRecognized: String,
  liked: Boolean,
  parentGenre: [String],
})

const Genre = mongoose.model('Genre', genreSchema)

export {
  Genre
}