import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface IGenTokenProps {
  nickname: string;
}

const { JWT_SECRET_KEY = 'defaultsecretkey' } = process.env;

const generateToken = ({ nickname }: IGenTokenProps) => {
  const date = Date.now();
  const payload = {
    date,
    nickname,
  };
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '24h' });
};

export { generateToken };
