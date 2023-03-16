import express from 'express'
import { addPostCtrl, deletePostCtrl, postByIdCtrl, postsListCtrl, updatePostCtrl } from '../controllers/posts.controller';
import { checkJWT } from '../middlewares/checkJWT';
import { wrapCtrl } from '../middlewares/wrapCtrl'

const router = express.Router()


router.get('/', wrapCtrl(postsListCtrl));
router.get('/:postId', wrapCtrl(postByIdCtrl));

router.use(checkJWT)
router.post('/', wrapCtrl(addPostCtrl));
router.patch('/:postId', wrapCtrl(updatePostCtrl));
router.delete('/:postId', wrapCtrl(deletePostCtrl));



export { router as postsRouter }