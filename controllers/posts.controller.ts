import { Request, Response } from 'express'

const postsListCtrl = async (req: Request, res: Response) => {
    res.status(200).json({
    })
}

const postByIdCtrl = async (req: Request, res: Response) => {
    res.status(200).json({
    })
}

const addPostCtrl = async (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Post added successfully in your portfolio!'
    })
}

const deletePostCtrl = async (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Post deleted successfully!'
    })
}

const updatePostCtrl = async (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Post updated successfully!'
    })
}


export { postByIdCtrl, postsListCtrl, deletePostCtrl, addPostCtrl, updatePostCtrl }