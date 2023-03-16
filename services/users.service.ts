import { db } from '../db/config'
import bcrypt from 'bcryptjs'
import { ConflictError, NotAuthorizedError } from '../helpers/errors';
import { generateToken } from '../helpers/generateJWT';

interface IUser {
    nickname: string;
    password: string;
}

const signIn = async (body: IUser) => {
    const { nickname, password } = body;

    const user = await db.query('SELECT * FROM users WHERE nickname = $1', [nickname]);

    const hashedPassword = user.rows[0].password;
    const isPasswordValid = bcrypt.compareSync(password, hashedPassword);

    if (user.rows.length === 0 || !isPasswordValid) {
        throw new NotAuthorizedError(`Wrong nickname or password`);
    }

    const accessToken = generateToken({ nickname });

    await db.query('UPDATE users SET accessToken = $1 WHERE id = $2', [accessToken, user.rows[0].id]);

    return { accessToken };
}

const signUp = async (body: IUser) => {
    const { nickname, password } = body;

    const user = await db.query('SELECT * FROM users WHERE nickname = $1', [nickname]);

    if (user.rows.length > 0) {
        throw new ConflictError(`User with nickname ${nickname} is already registered`);
    }

    const accessToken = generateToken({ nickname });

    const newUser = {
        ...body,
        password: bcrypt.hashSync(password, 10),
        accessToken,
    };

    const { rows } = await db.query(
        'INSERT INTO users (nickname, password, accessToken) VALUES ($1, $2, $3) RETURNING *',
        [newUser.nickname, newUser.password, newUser.accessToken]
    );

    const updated = rows[0];
    delete updated.password;

    return updated;

}

const logOut = async (id: number) => {
    await db.query('UPDATE users SET access_token = NULL WHERE id = $1 RETURNING *', [id]);

    return
}


export { signIn, signUp, logOut }