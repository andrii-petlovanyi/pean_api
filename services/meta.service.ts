import { db } from '../db/config';
import { CustomError } from '../helpers/errors';

interface IMetaData {
  page: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  meta_image: string;
  meta_author: string;
}

const pageMetaList = async (page: string | undefined) => {
  if (page) {
    const { rows } = await db.query(`SELECT * FROM meta WHERE page = $1`, [
      page,
    ]);

    if (!rows.length)
      throw new CustomError(`Meta data for page: ${page} not found`);

    return rows[0];
  }
  const { rows } = await db.query(`SELECT * FROM meta`);

  return rows;
};

const addPageMeta = async (body: IMetaData) => {
  const {
    page,
    meta_title,
    meta_description,
    meta_author,
    meta_image,
    meta_keywords,
  } = body;

  const { rows } = await db.query(
    'INSERT INTO meta (page, meta_title, meta_description, meta_author, meta_image, meta_keywords) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [page, meta_title, meta_description, meta_author, meta_image, meta_keywords]
  );

  return rows[0];
};

const deletePageMeta = async (metaId: string) => {
  const { rowCount } = await db.query('DELETE FROM meta WHERE id = $1', [
    metaId,
  ]);

  if (rowCount === 0) {
    throw new CustomError(`Meta data with id: ${metaId} not found`);
  }

  return;
};

const updatePageMeta = async (metaId: string, body: IMetaData) => {
  const {
    page,
    meta_title,
    meta_description,
    meta_author,
    meta_image,
    meta_keywords,
  } = body;

  const { rows, rowCount } = await db.query(
    'UPDATE meta SET page = $1, meta_title = $2, meta_description = $3, meta_author = $4, meta_image = $5, meta_keywords = $6 WHERE page = $7 RETURNING *',
    [
      page,
      meta_title,
      meta_description,
      meta_author,
      meta_image,
      meta_keywords,
      metaId,
    ]
  );

  if (rowCount === 0) {
    throw new CustomError(`Meta data with id: ${metaId} not found`);
  }

  return rows[0];
};

export { pageMetaList, addPageMeta, deletePageMeta, updatePageMeta };
