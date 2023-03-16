import express from 'express'
import { addProjectCtrl, deleteProjectCtrl, projectByIdCtrl, projectsListCtrl, updateProjectCtrl } from '../controllers/projects.controller';
import { checkJWT } from '../middlewares/checkJWT';
import { wrapCtrl } from '../middlewares/wrapCtrl'

const router = express.Router()


router.get('/', wrapCtrl(projectsListCtrl));
router.get('/:projectId', wrapCtrl(projectByIdCtrl));

router.use(checkJWT)
router.post('/', wrapCtrl(addProjectCtrl));
router.patch('/:projectId', wrapCtrl(updateProjectCtrl));
router.delete('/:projectId', wrapCtrl(deleteProjectCtrl));



export { router as projectsRouter }