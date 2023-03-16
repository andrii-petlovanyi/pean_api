import { Request, Response } from 'express'
import { logOut, signIn, signUp } from '../services/users.service';

interface CustomRequest extends Request {
    user?: any;
}

const signInCtrl = async (req: Request, res: Response) => {
    const body = req.body

    const user = await signIn(body);

    res.status(200).json({
        message: 'You are sign in successfully!',
        user
    })
}

const signUpCtrl = async (req: Request, res: Response) => {
    const body = req.body;

    const user = await signUp(body);

    res.status(201).json({
        message: 'You are sign up successfully!',
        user
    })
}

const logoutCtrl = async (req: CustomRequest, res: Response) => {
    const { id } = req.user

    await logOut(id)

    res.status(200).json({
        message: 'You are logout successfully!'
    })
}

const currentCtrl = async (req: CustomRequest, res: Response) => {
    const user = req.user;
    delete user.password

    res.status(200).json({
        user
    })
}

export { signInCtrl, signUpCtrl, logoutCtrl, currentCtrl }