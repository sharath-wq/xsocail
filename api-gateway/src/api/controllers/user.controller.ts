import { Request, Response, NextFunction } from 'express';
import { UserControllerInterface } from '../interface/controllers/user.controller';

export class UserController implements UserControllerInterface {
    // get Current user
    async getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.send({ currentUser: req.currentUser || null });
        } catch (error) {
            next(error);
        }
    }
}
