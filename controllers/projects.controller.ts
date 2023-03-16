import { Request, Response } from 'express'

const projectsListCtrl = async (req: Request, res: Response) => {
    res.status(200).json({
    })
}

const projectByIdCtrl = async (req: Request, res: Response) => {
    res.status(200).json({
    })
}

const addProjectCtrl = async (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Project added successfully in your portfolio!'
    })
}

const deleteProjectCtrl = async (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Project deleted successfully!'
    })
}

const updateProjectCtrl = async (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Project updated successfully!'
    })
}


export { projectByIdCtrl, projectsListCtrl, deleteProjectCtrl, addProjectCtrl, updateProjectCtrl }