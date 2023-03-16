import express from 'express';
import {
  addProjectCtrl,
  deleteProjectCtrl,
  projectByIdCtrl,
  projectsListCtrl,
  updateProjectCtrl,
} from '../controllers/projects.controller';
import { checkJWT } from '../middlewares/checkJWT';
import { idValidation } from '../middlewares/idValidation';
import { wrapCtrl } from '../middlewares/wrapCtrl';

const router = express.Router();

router.get('/', wrapCtrl(projectsListCtrl));
router.get('/:projectId', idValidation('projectId'), wrapCtrl(projectByIdCtrl));

router.use(checkJWT);
router.post('/', wrapCtrl(addProjectCtrl));
router.patch(
  '/:projectId',
  idValidation('projectId'),
  wrapCtrl(updateProjectCtrl)
);
router.delete(
  '/:projectId',
  idValidation('projectId'),
  wrapCtrl(deleteProjectCtrl)
);

export { router as projectsRouter };
