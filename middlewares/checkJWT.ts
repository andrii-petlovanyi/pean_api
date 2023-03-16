import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { db } from '../db/config';
import { NotAuthorizedError } from '../helpers/errors';

const { JWT_SECRET_KEY = 'defaultkeyvalue' } = process.env;

interface IJwtPayload {
  nickname: number;
  iat: number;
  exp: number;
}

interface CustomRequest extends Request {
  user?: any;
}

const checkJWT = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const [bearer, token] = req.headers.authorization?.split(' ') ?? [];
  try {
    if (bearer !== 'Bearer') {
      throw new NotAuthorizedError('Wrong params bearer! Not authorized');
    }

    const { nickname } = jwt.verify(token, JWT_SECRET_KEY) as IJwtPayload;
    const { rows } = await db.query(
      'SELECT * FROM users WHERE nickname = $1 AND accessToken = $2',
      [nickname, token]
    );

    if (rows.length === 0) {
      throw new NotAuthorizedError('Not authorized');
    }

    req.user = rows[0];
    next();
  } catch (error) {
    const err = error as Error;
    next(new NotAuthorizedError(err.message));
  }
};

export { checkJWT };
