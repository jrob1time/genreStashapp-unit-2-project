import { Genre } from '../models/genre.js'

function index(req, res) {
  Genre.find({})
  .then(genre => {
    res.render('genres/index', {
      genre,
      title: "Genres"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  index
}