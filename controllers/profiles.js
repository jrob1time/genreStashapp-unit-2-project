import { Profile } from "../models/profile.js"


function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: " "
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render("profiles/show", {
      title: ` ${profile.name}'s profile`,
      profile,
      isSelf,
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/profiles")
  })
}

function createArtist(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.artists.push(req.body)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function deleteArtist(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.artists.remove({_id: req.params.id})
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function editArtist(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    const artist = profile.artists.id(req.params.artistId)
    if (artist.artister.equals(req.user.profile._id)) {
      res.render('profiles/editartist', {
        profile, 
        artist,
        title: 'Update Artist'
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

function updateArtist(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    const artist = profile.artists.id(req.params.artistId)
    if (artist.artister.equals(req.user.profile._id)) {
      artist.set(req.body)
      profile.save()
      .then(() => {
        res.redirect(`/profiles/${profile._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/profiles')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

export {
  index,
  show,
  createArtist,
  deleteArtist,
  editArtist,
  updateArtist
}