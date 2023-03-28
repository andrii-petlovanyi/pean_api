import { Request, Response } from 'express';
import {
  addPageMeta,
  deletePageMeta,
  pageMetaList,
  updatePageMeta,
} from '../services/meta.service';

const pageMetaListCtrl = async (req: Request, res: Response) => {
  const page = req.query.page as string | undefined;

  const meta = await pageMetaList(page);

  res.status(200).json({
    meta,
  });
};

const addPageMetaCtrl = async (req: Request, res: Response) => {
  const body = req.body;

  const meta = await addPageMeta(body);

  res.status(201).json({
    message: 'Meta data added successfully in your portfolio!',
    meta,
  });
};

const deletePageMetaCtrl = async (req: Request, res: Response) => {
  const { metaId } = req.params;

  await deletePageMeta(metaId);

  res.status(200).json({
    message: 'Meta data deleted successfully!',
  });
};

const updatePageMetaCtrl = async (req: Request, res: Response) => {
  const body = req.body;
  const { metaId } = req.params;

  const post = await updatePageMeta(metaId, body);

  res.status(200).json({
    message: 'Meta data updated successfully!',
    post,
  });
};

export {
  pageMetaListCtrl,
  addPageMetaCtrl,
  deletePageMetaCtrl,
  updatePageMetaCtrl,
};
