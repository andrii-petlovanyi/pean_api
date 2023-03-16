import { Request, Response } from 'express';
import {
  addPost,
  deletePost,
  postById,
  postsList,
  updatePost,
} from '../services/posts.service';

const postsListCtrl = async (req: Request, res: Response) => {
  const posts = await postsList();

  res.status(200).json({
    posts,
  });
};

const postByIdCtrl = async (req: Request, res: Response) => {
  const { postId } = req.params;

  const post = await postById(postId);

  res.status(200).json({
    post,
  });
};

const addPostCtrl = async (req: Request, res: Response) => {
  const body = req.body;

  const post = await addPost(body);

  res.status(201).json({
    message: 'Post added successfully in your portfolio!',
    post,
  });
};

const deletePostCtrl = async (req: Request, res: Response) => {
  const { postId } = req.params;

  await deletePost(postId);

  res.status(200).json({
    message: 'Post deleted successfully!',
  });
};

const updatePostCtrl = async (req: Request, res: Response) => {
  const body = req.body;
  const { postId } = req.params;

  const post = await updatePost(postId, body);

  res.status(200).json({
    message: 'Post updated successfully!',
    post,
  });
};

export {
  postByIdCtrl,
  postsListCtrl,
  deletePostCtrl,
  addPostCtrl,
  updatePostCtrl,
};
