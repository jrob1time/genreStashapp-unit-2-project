import mongoose from 'mongoose'

const Schema = mongoose.Schema

const albumSchema = new Schema({
  name: String,
  album: String
})

const Album = mongoose.model("Album", albumSchema)

export {
  Album
}