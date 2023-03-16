import { db } from '../db/config';
import { CustomError } from '../helpers/errors';

interface IPost {
  title: string;
  description: string;
  article: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

const postsList = async () => {
  const { rows } = await db.query('SELECT * FROM posts');

  return rows[0];
};

const postById = async (postId: string) => {
  const { rows } = await db.query('SELECT * FROM posts WHERE id = $1', [
    postId,
  ]);

  if (!rows.length) throw new CustomError(`Post with id: ${postId} not found`);

  return rows[0];
};

const addPost = async (body: IPost) => {
  const {
    title,
    description,
    article,
    meta_title,
    meta_description,
    meta_keywords,
  } = body;

  const { rows } = await db.query(
    'INSERT INTO posts (title, description, article, meta_title, meta_description, meta_keywords) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, description, article, meta_title, meta_description, meta_keywords]
  );

  return rows[0];
};

const deletePost = async (postId: string) => {
  const { rowCount } = await db.query('DELETE FROM posts WHERE id = $1', [
    postId,
  ]);

  if (rowCount === 0) {
    throw new CustomError(`Post with id: ${postId} not found`);
  }

  return;
};

const updatePost = async (postId: string, body: IPost) => {
  const {
    title,
    description,
    article,
    meta_title,
    meta_description,
    meta_keywords,
  } = body;

  const { rows, rowCount } = await db.query(
    'UPDATE posts SET title = $1, description = $2, article = $3, meta_title = $4, meta_description = $5, meta_keywords = $6 WHERE id = $7 RETURNING *',
    [
      title,
      description,
      article,
      meta_title,
      meta_description,
      meta_keywords,
      postId,
    ]
  );

  if (rowCount === 0) {
    throw new CustomError(`Post with id: ${postId} not found`);
  }

  return rows[0];
};

export { postsList, postById, addPost, deletePost, updatePost };
