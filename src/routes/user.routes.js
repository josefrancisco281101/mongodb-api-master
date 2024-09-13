import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import { validateID } from '../middlewares/middleware.js'

const router = Router()

router.get('/', UserController.index)
router.get('/:id', validateID, UserController.getById)
router.post('/', UserController.store)
router.delete('/:id', validateID, UserController.delete)
router.patch('/:id', validateID, UserController.updatePatch)
export default router