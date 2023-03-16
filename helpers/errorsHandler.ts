import express from 'express';
import { CustomError } from './errors';

interface ErrorRequestHandler extends express.ErrorRequestHandler {}

const errorsHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
};

export { errorsHandler };
