import express from 'express'
import { currentCtrl, logoutCtrl, signInCtrl, signUpCtrl } from '../controllers/users.controller';
import { checkJWT } from '../middlewares/checkJWT';
import { wrapCtrl } from '../middlewares/wrapCtrl'

const router = express.Router()

router.post('/signin', wrapCtrl(signInCtrl));
router.post('/signup', wrapCtrl(signUpCtrl));

router.use(checkJWT)
router.get('/current', wrapCtrl(currentCtrl));
router.get('/logout', wrapCtrl(logoutCtrl));


export { router as usersRouter }