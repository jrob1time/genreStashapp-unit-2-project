import { Router } from 'express'
import * as genresCtrl from '../controllers/genres.js'

const router = Router()

router.get('/', genresCtrl.index)

export {
  router
}