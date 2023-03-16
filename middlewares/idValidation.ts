import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../helpers/errors';

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isValidUUID = (uuid: string): boolean => {
  return uuidRegex.test(uuid);
};

const idValidation = (key: string) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const id = req.params[key];

    if (!isValidUUID(id)) {
      return next(new CustomError('Invalid id format'));
    }

    next();
  };
};

export { idValidation };