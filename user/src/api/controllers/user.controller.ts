import { NextFunction, Request, Response } from 'express';
import {
    CretaeUserUseCase,
    DeleteUserUseCase,
    GetAllUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    LoginUseCase,
    UpdateUserProfileImageUseCase,
} from '../../domain/interfaces/use-cases/user/index';
import { UserRequestModel } from '../../domain/entities/user';
import { UserControllerInterface } from '../interfaces/controllers/user.controller';

import { UserUpdatedPubliser } from '../events/pub/user-updated-publisher';
import { natsWrapper } from '../../../nats-wrapper';
import { UserCreatedPublisher } from '../events/pub/user-created-publisher';
import { SendResetTokenUseCase } from '../../domain/interfaces/use-cases/token/send-reset-token.use-caes';
import { ResetPasswordUseCase } from '../../domain/interfaces/use-cases/token/reset-password.use-case';
import { BadRequestError } from '@scxsocialcommon/errors';

import sharp from 'sharp';
import { CloudinaryFile, cloudinary } from '../../config/cloudinary.config';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export class UserController implements UserControllerInterface {
    createUserUseCase: CretaeUserUseCase;
    deleteUserUseCase: DeleteUserUseCase;
    getAllUserUseCase: GetAllUserUseCase;
    getUserUseCase: GetUserUseCase;
    updateUserUseCase: UpdateUserUseCase;
    loginUseCase: LoginUseCase;
    sendRestTokenUseCase: SendResetTokenUseCase;
    resetPasswordUsecase: ResetPasswordUseCase;
    updateUserProfileImageUseCase: UpdateUserProfileImageUseCase;

    constructor(
        cretaeUserUseCase: CretaeUserUseCase,
        deleteUserUseCase: DeleteUserUseCase,
        getAllUserUseCase: GetAllUserUseCase,
        getUserUseCase: GetUserUseCase,
        updateUserUseCase: UpdateUserUseCase,
        loginUseCase: LoginUseCase,
        sendRestTokenUseCase: SendResetTokenUseCase,
        resetPasswordUsecase: ResetPasswordUseCase,
        updateUserProfileImageUseCase: UpdateUserProfileImageUseCase
    ) {
        this.createUserUseCase = cretaeUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
        this.getAllUserUseCase = getAllUserUseCase;
        this.getUserUseCase = getUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.loginUseCase = loginUseCase;
        this.sendRestTokenUseCase = sendRestTokenUseCase;
        this.resetPasswordUsecase = resetPasswordUsecase;
        this.updateUserProfileImageUseCase = updateUserProfileImageUseCase;
    }

    async updateUserProfileImage(req: Request, res: Response, next: NextFunction): Promise<void> {
        const file = req.file;
        try {
            let imageUrl;

            const fileToUpload: CloudinaryFile = req.file as CloudinaryFile;
            if (!fileToUpload) {
                throw new BadRequestError('file not provided');
            }

            const resizedBuffer: Buffer = await sharp(file?.buffer).resize({ width: 600, height: 600 }).toBuffer();
            const uploadPromise = new Promise<void>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        folder: 'profile',
                    } as any,
                    (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                        if (err) {
                            console.error('Cloudinary upload error:', err);
                            reject(err);
                        } else if (!result) {
                            console.error('Cloudinary upload error: Result is undefined');
                            reject(new Error('Cloudinary upload result is undefined'));
                        } else {
                            imageUrl = result.secure_url;
                            resolve();
                        }
                    }
                );
                uploadStream.end(resizedBuffer);
            });

            await Promise.resolve(uploadPromise);

            const updatedUser = await this.updateUserProfileImageUseCase.execute(req.params.userId, imageUrl!);

            if (updatedUser) {
                await new UserUpdatedPubliser(natsWrapper.client).publish({
                    userId: updatedUser.id,
                    imageUrl: updatedUser.imageUrl,
                    isAdmin: updatedUser.isAdmin,
                    email: updatedUser.email,
                    username: updatedUser.username,
                });
            }

            res.send(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    async Login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await this.loginUseCase.execute(email, password);

            res.status(200).send({ user });
        } catch (error) {
            next(error);
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await this.createUserUseCase.execute(req.body as UserRequestModel);

            if (user) {
                await new UserCreatedPublisher(natsWrapper.client).publish({
                    userId: user.id,
                    imageUrl: user.imageUrl,
                    isAdmin: user.isAdmin,
                    username: user.username,
                    email: user.email,
                });
            }

            res.status(201).send(user);
        } catch (error) {
            next(error);
        }
    }
    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            await this.deleteUserUseCase.execute(id);
            res.send({ message: 'User Deleted' });
        } catch (error) {
            next(error);
        }
    }
    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const { username, email, bio, fullName } = req.body;
            const updatedUser = await this.updateUserUseCase.execute(id, {
                username,
                email,
                bio,
                fullName,
            } as UserRequestModel);

            if (updatedUser) {
                await new UserUpdatedPubliser(natsWrapper.client).publish({
                    userId: updatedUser.id,
                    imageUrl: updatedUser.imageUrl,
                    isAdmin: updatedUser.isAdmin,
                    email: updatedUser.email,
                    username: updatedUser.username,
                });
            }

            res.status(200).send(updatedUser);
        } catch (error) {
            next(error);
        }
    }
    async getAllUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.getAllUserUseCase.execute();
            res.send(users);
        } catch (error) {
            next(error);
        }
    }
    async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const user = await this.getUserUseCase.execute(id);
            res.send(user);
        } catch (error) {
            next(error);
        }
    }

    async sendResetToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        const email = req.body.email;
        try {
            const token = await this.sendRestTokenUseCase.execute(email);

            res.status(200).send({});
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { password } = req.body;
        const { userId, token } = req.params;
        try {
            await this.resetPasswordUsecase.execute(password, userId, token);

            res.status(200).send({});
        } catch (error) {
            next(error);
        }
    }
}
