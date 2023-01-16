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

function create(req, res) {
  req.body.owner = req.user.profile._id
	req.body.liked = !!req.body.liked
  Genre.create(req.body)
  .then(genre => {
    res.redirect('/genres')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/genres')
  })
}

function show(req, res) {
  Genre.findById(req.params.id)
  .populate("owner")
  .then(genre => {
    res.render('genres/show', {
      genre,
      title: "genre show"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/genres')
  })
}

export {
  index,
  create,
  show
}