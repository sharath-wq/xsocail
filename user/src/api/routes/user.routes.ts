import express, { NextFunction, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import multer, { Multer } from 'multer';
import {
    CretaeUserUseCase,
    DeleteUserUseCase,
    GetAllUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    LoginUseCase,
    UpdateUserProfileImageUseCase,
    SendVerificationOtpUseCase,
    VerifyUserEmailUseCase,
    BlockUserUseCase,
    UnblockUserUseCase,
    SavePostUseCase,
    UnsavePostUseCase,
    FollowUserUseCase,
    UnfollowUserUseCase,
    GetUserFriendsUseCase,
    GetUserFollowersUseCase,
    GetUserFollowingUseCase,
    GetSuggestedUsersUseCase,
} from '../../domain/interfaces/use-cases/user/index';
import { body } from 'express-validator';
import { validateRequest } from '@scxsocialcommon/errors';
import { SendResetTokenUseCase } from '../../domain/interfaces/use-cases/token/send-reset-token.use-caes';
import { ResetPasswordUseCase } from '../../domain/interfaces/use-cases/token/reset-password.use-case';
import { GetUserBatchUseCase } from '../../domain/interfaces/use-cases/user/get-user-batch.use-case';

const storage = multer.memoryStorage();
export const upload: Multer = multer({ storage: storage });

export default function UserRouter(
    createUserUseCase: CretaeUserUseCase,
    deleteUserUseCase: DeleteUserUseCase,
    getAllUserUseCase: GetAllUserUseCase,
    getUserUseCase: GetUserUseCase,
    updateUserUseCase: UpdateUserUseCase,
    loginUseCase: LoginUseCase,
    sendRestTokenUseCase: SendResetTokenUseCase,
    resetPasswordUsecase: ResetPasswordUseCase,
    updateUserProfileImageUseCase: UpdateUserProfileImageUseCase,
    sendVerificationOtpUseCase: SendVerificationOtpUseCase,
    verifyUserEmailUseCase: VerifyUserEmailUseCase,
    blockUserUseCase: BlockUserUseCase,
    unblockUserUseCase: UnblockUserUseCase,
    savePostUseCase: SavePostUseCase,
    unsavePostUseCase: UnsavePostUseCase,
    followUserUseCase: FollowUserUseCase,
    unfollowUserUseCase: UnfollowUserUseCase,
    getUserFriendsUseCase: GetUserFriendsUseCase,
    getUserBatchUseCase: GetUserBatchUseCase,
    getUserFollowingUseCase: GetUserFollowingUseCase,
    getUserFollowersUseCase: GetUserFollowersUseCase,
    getSuggestedUsersUseCase: GetSuggestedUsersUseCase
) {
    const router = express.Router();
    const userController = new UserController(
        createUserUseCase,
        deleteUserUseCase,
        getAllUserUseCase,
        getUserUseCase,
        updateUserUseCase,
        loginUseCase,
        sendRestTokenUseCase,
        resetPasswordUsecase,
        updateUserProfileImageUseCase,
        sendVerificationOtpUseCase,
        verifyUserEmailUseCase,
        blockUserUseCase,
        unblockUserUseCase,
        savePostUseCase,
        unsavePostUseCase,
        followUserUseCase,
        unfollowUserUseCase,
        getUserFriendsUseCase,
        getUserBatchUseCase,
        getUserFollowersUseCase,
        getUserFollowingUseCase,
        getSuggestedUsersUseCase
    );

    router.get('/', async (req, res, next) => userController.getAllUser(req, res, next));
    router.get('/suggested', async (req, res, next) => userController.getSuggestedUsers(req, res, next));

    router.post(
        '/',
        [
            body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
            body('email').isEmail().withMessage('Invalid email address'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
            body('fullName').isLength({ min: 1 }).withMessage('Full name is required'),
        ],
        validateRequest,
        async (req: Request, res: Response, next: NextFunction) => userController.createUser(req, res, next)
    );

    router.get('/:id', async (req, res, next) => userController.getUser(req, res, next));

    router.get('/friends/:userId', async (req, res, next) => userController.getUserFriends(req, res, next));

    router.get('/following/:userId', async (req, res, next) => userController.getUserFollowing(req, res, next));

    router.get('/followers/:userId', async (req, res, next) => userController.getUserFollowers(req, res, next));

    router.delete('/:id', async (req, res, next) => userController.deleteUser(req, res, next));

    router.patch(
        '/:id',
        [
            body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
            body('email').isEmail().withMessage('Invalid email address'),
            body('fullName').isLength({ min: 1 }).withMessage('Full name is required'),
        ],
        validateRequest,
        async (req: Request, res: Response, next: NextFunction) => userController.updateUser(req, res, next)
    );

    router.post(
        '/login',
        [
            body('email').isEmail().withMessage('Email must be valid'),
            body('password').trim().notEmpty().withMessage('Password is required'),
        ],
        validateRequest,
        async (req: Request, res: Response, next: NextFunction) => userController.Login(req, res, next)
    );

    router.post('/reset-password', async (req: Request, res: Response, next: NextFunction) =>
        userController.sendResetToken(req, res, next)
    );

    router.post('/reset-password/:userId/:token', async (req: Request, res: Response, next: NextFunction) =>
        userController.resetPassword(req, res, next)
    );

    router.post('/image/:userId', upload.single('file'), async (req: Request, res: Response, next: NextFunction) =>
        userController.updateUserProfileImage(req, res, next)
    );

    router.post('/verify', async (req: Request, res: Response, next: NextFunction) => {
        userController.verifyUserEmail(req, res, next);
    });

    router.post('/resend', async (req: Request, res: Response, next: NextFunction) => {
        userController.resendOtp(req, res, next);
    });

    router.put('/block/:id', async (req: Request, res: Response, next: NextFunction) => {
        userController.blockUser(req, res, next);
    });

    router.put('/unblock/:id', async (req: Request, res: Response, next: NextFunction) => {
        userController.unblockUser(req, res, next);
    });

    router.put('/save/:postId', async (req: Request, res: Response, next: NextFunction) => {
        userController.savePost(req, res, next);
    });

    router.put('/unsave/:postId', async (req: Request, res: Response, next: NextFunction) => {
        userController.unsavePost(req, res, next);
    });

    router.put('/follow', async (req: Request, res: Response, next: NextFunction) => {
        userController.follow(req, res, next);
    });

    router.put('/unfollow', async (req: Request, res: Response, next: NextFunction) => {
        userController.unfollow(req, res, next);
    });

    router.post('/batch', async (req: Request, res: Response, next: NextFunction) => {
        userController.getUserBatch(req, res, next);
    });

    return router;
}
