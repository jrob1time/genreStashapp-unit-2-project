import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  commenter: { type: Schema.Types.ObjectId, ref: "Profile"},
})

const genreSchema = new Schema({
  name: String,
  locationOrigin: String,
  yearRecognized: String,
  liked: Boolean,
  parentGenre: [String],
  comments: [commentSchema]
})

const Genre = mongoose.model('Genre', genreSchema)

export {
  Genre
}