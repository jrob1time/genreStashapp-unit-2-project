import { Genre } from '../models/genre.js'

function index(req, res) {
  Genre.find({})
  .then(genres => {
    res.render('genres/index', {
      title: 'Genre',
      genres
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.liked = !!req.body.liked
  req.body.owner = req.user.profile._id
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
  .populate('owner')
  .populate('comments.commenter')
  .then(genre => {
    res.render('genres/show', {
      title: "Genre",
      genre
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/genres')
  })
}

function flipLiked(req, res) {
  Genre.findById(req.params.id)
  .then(genre => {
    genre.liked = !genre.liked
    genre.save()
    .then(() => {
      res.redirect(`/genres/${genre._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/genres')
  })
}

function edit(req, res) {
  Genre.findById(req.params.id)
  .then(genre => {
    res.render('genres/edit', {
      genre,
      title: 'edit genre'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/genres')
  })
}

function update(req, res) {
  Genre.findById(req.params.id)
  .then(genre => {
    if (genre.owner.equals(req.user.profile._id)) {
      req.body.liked = !!req.body.liked
      genre.updateOne(req.body)
      .then(()=> {
        res.redirect(`/genres/${genre._id}`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/genres')
  })
}

function deleteGenre(req, res) {
  Genre.findById(req.params.id)
  .then(genre => {
    if (genre.owner.equals(req.user.profile._id)) {
      genre.delete()
      .then(()=> {
        res.redirect(`/genres`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/genres')
  })
}

function addComment(req, res) {
  Genre.findById(req.params.id)
  .then(genre => {
    req.body.commenter = req.user.profile._id
    genre.comments.push(req.body)
    genre.save()
    .then(()=> {
      res.redirect(`/genres/${genre._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/genres')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/genres')
  })
}

function deleteComment(req, res) {
  Genre.findById(req.params.genreId)
  .then(genre => {
    const commentDoc = genre.comments.id(req.params.commentId)
    if (commentDoc.commenter.equals(req.user.profile._id)) {
      genre.comments.remove(commentDoc)
      genre.save()
      .then(() => {
        res.redirect(`/genres/${genre._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/genres')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/genres')
  })
}

function editComment(req, res) {
  Genre.findById(req.params.genreId)
  .then(genre => {
    const commentDoc = genre.comments.id(req.params.commentId)
    if (commentDoc.commenter.equals(req.user.profile._id)) {
      res.render('genres/editComment', {
        genre, 
        comment: commentDoc,
        title: 'Update Comment'
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
}

function updateComment(req, res) {
  Genre.findById(req.params.genreId)
  .then(genre => {
    const commentDoc = genre.comments.id(req.params.commentId)
    if (commentDoc.commenter.equals(req.user.profile._id)) {
      commentDoc.set(req.body)
      genre.save()
      .then(() => {
        res.redirect(`/genres/${genre._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/genres')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/genres')
  })
}

export {
  index,
  create,
  show,
  flipLiked,
  edit,
  update,
  deleteGenre as delete,
  addComment,
  deleteComment,
  editComment,
  updateComment
}