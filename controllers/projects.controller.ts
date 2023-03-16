import { Request, Response } from 'express';
import {
  addProject,
  deleteProject,
  projectById,
  projectsList,
  updateProject,
} from '../services/projects.service';

const projectsListCtrl = async (req: Request, res: Response) => {
  const projects = await projectsList();

  res.status(200).json({
    projects,
  });
};

const projectByIdCtrl = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  const project = await projectById(projectId);

  res.status(200).json({
    project,
  });
};

const addProjectCtrl = async (req: Request, res: Response) => {
  const body = req.body;

  const project = await addProject(body);

  res.status(201).json({
    message: 'Project added successfully in your portfolio!',
    project,
  });
};

const deleteProjectCtrl = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  await deleteProject(projectId);

  res.status(200).json({
    message: 'Project deleted successfully!',
  });
};

const updateProjectCtrl = async (req: Request, res: Response) => {
  const body = req.body;
  const { projectId } = req.params;

  const project = await updateProject(projectId, body);

  res.status(200).json({
    message: 'Project updated successfully!',
    project,
  });
};

export {
  projectByIdCtrl,
  projectsListCtrl,
  deleteProjectCtrl,
  addProjectCtrl,
  updateProjectCtrl,
};
