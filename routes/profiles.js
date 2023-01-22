import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.get('/:profileId/artists/:artistId/edit', isLoggedIn, profilesCtrl.editArtist)
router.post('/:id/artists', isLoggedIn, profilesCtrl.createArtist)
router.put('/:profileId/artists/:artistId/edit', isLoggedIn, profilesCtrl.updateArtist)
router.delete('/artists/:id', isLoggedIn, profilesCtrl.deleteArtist)

export {
  router
}