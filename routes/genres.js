import { Router } from 'express'
import * as genresCtrl from '../controllers/genres.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', genresCtrl.index)
router.get('/:id', genresCtrl.show)
router.get('/:id/edit', isLoggedIn, genresCtrl.edit)
router.get('/:genreId/comments/:commentId/edit', isLoggedIn, genresCtrl.editComment)
router.post('/', isLoggedIn, genresCtrl.create)
router.post('/:id/comments', isLoggedIn, genresCtrl.addComment)
router.patch('/:id/flip-liked', isLoggedIn, genresCtrl.flipLiked)
router.put('/:id', isLoggedIn, genresCtrl.update)
router.put('/:genreId/comments/:commentId', isLoggedIn, genresCtrl.updateComment)
router.delete('/:id', isLoggedIn, genresCtrl.delete)
router.delete('/:genreId/comments/:commentId', isLoggedIn, genresCtrl.deleteComment)

export {
  router
}