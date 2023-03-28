import express from 'express';
import {
  addPageMetaCtrl,
  deletePageMetaCtrl,
  pageMetaListCtrl,
  updatePageMetaCtrl,
} from '../controllers/meta.controller';

import { checkJWT } from '../middlewares/checkJWT';
import { idValidation } from '../middlewares/idValidation';
import { wrapCtrl } from '../middlewares/wrapCtrl';

const router = express.Router();

router.get('/', wrapCtrl(pageMetaListCtrl));

router.use(checkJWT);
router.post('/', wrapCtrl(addPageMetaCtrl));
router.patch('/:metaId', idValidation('metaId'), wrapCtrl(updatePageMetaCtrl));
router.delete('/:metaId', idValidation('metaId'), wrapCtrl(deletePageMetaCtrl));

export { router as metaRouter };
