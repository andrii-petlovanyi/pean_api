import { Request, Response, NextFunction } from 'express';

const wrapCtrl = (controller: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    const func = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            next(error);
        }
    };
    return func;
};

export { wrapCtrl }