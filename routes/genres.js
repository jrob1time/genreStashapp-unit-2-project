import { Router } from 'express'
import * as genresCtrl from '../controllers/genres.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', genresCtrl.index)
router.get('/:id', genresCtrl.show)
router.post('/', genresCtrl.create)
router.post('/', isLoggedIn, genresCtrl.create)

export {
  router
}