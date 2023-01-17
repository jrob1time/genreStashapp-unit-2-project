import mongoose from 'mongoose'

const Schema = mongoose.Schema

const artistSchema = new Schema({
  name: String,
  artistReference: String,
  albumReference: String
}, {
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  artists: [artistSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}