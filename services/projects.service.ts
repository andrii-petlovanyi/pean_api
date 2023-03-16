import { db } from '../db/config';
import { CustomError } from '../helpers/errors';

interface IProject {
  title: string;
  description: string;
  article: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  images: string[];
}

const projectsList = async () => {
  const { rows } = await db.query('SELECT * FROM projects');

  return rows[0];
};

const projectById = async (projectId: string) => {
  const { rows } = await db.query('SELECT * FROM projects WHERE id = $1', [
    projectId,
  ]);

  if (!rows.length)
    throw new CustomError(`Project with id: ${projectId} not found`);

  return rows[0];
};

const addProject = async (body: IProject) => {
  const {
    title,
    description,
    article,
    meta_title,
    meta_description,
    meta_keywords,
    images,
  } = body;

  const { rows } = await db.query(
    'INSERT INTO projects (title, description, article, meta_title, meta_description, meta_keywords, images) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [
      title,
      description,
      article,
      meta_title,
      meta_description,
      meta_keywords,
      images,
    ]
  );

  return rows[0];
};

const deleteProject = async (projectId: string) => {
  const { rowCount } = await db.query('DELETE FROM projects WHERE id = $1', [
    projectId,
  ]);

  if (rowCount === 0) {
    throw new CustomError(`Project with id: ${projectId} not found`);
  }

  return;
};

const updateProject = async (projectId: string, body: IProject) => {
  const {
    title,
    description,
    article,
    meta_title,
    meta_description,
    meta_keywords,
    images,
  } = body;

  const { rowCount, rows } = await db.query(
    'UPDATE projects SET title = $1, description = $2, article = $3, meta_title = $4, meta_description = $5, meta_keywords = $6, images = $7 WHERE id = $8 RETURNING *',
    [
      title,
      description,
      article,
      meta_title,
      meta_description,
      meta_keywords,
      images,
      projectId,
    ]
  );

  if (rowCount === 0) {
    throw new CustomError(`Project with id: ${projectId} not found`);
  }

  return rows[0];
};

export { projectById, projectsList, addProject, deleteProject, updateProject };
