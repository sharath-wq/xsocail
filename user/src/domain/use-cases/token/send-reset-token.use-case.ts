import { BadRequestError, NotFoundError } from '@scxsocialcommon/errors';
import { TokenRepository } from '../../interfaces/repository/token.repository';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { SendResetTokenUseCase } from '../../interfaces/use-cases/token/send-reset-token.use-caes';
import crypto from 'crypto';
import sendEmail from '../../../utils/sendEmail';

import { TokenModel } from '../../entities/token';

export class SendResetToken implements SendResetTokenUseCase {
    tokenRepository: TokenRepository;
    userRepository: UserRepository;

    constructor(tokenRepository: TokenRepository, userRepository: UserRepository) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
    }

    async execute(email: string): Promise<TokenModel | null> {
        const existingUser = await this.userRepository.getUserByEmail(email);

        if (!existingUser) {
            throw new NotFoundError();
        }

        const newToken = await this.tokenRepository.createToken({
            userId: existingUser.id,
            token: crypto.randomBytes(32).toString('hex'),
        });

        const link = `https://scportfolio.online/auth/reset-password/${existingUser.id}/${newToken!.token}`;

        const emailContent = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0">
        <table
            role="presentation"
            align="center"
            cellpadding="0"
            cellspacing="0"
            width="600"
            style="margin: auto; border-collapse: collapse"
        >
            <tr>
                <td style="padding: 20px 0; text-align: center; background-color: #111827; color: white">
                    <h2>Password Reset</h2>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px 0">
                    <p>Hello, ${existingUser.fullName}</p>
                    <p>We received a request to reset your password. Click the link below to reset your password:</p>
                    <p>
                        <a
                            href="${link}"
                            style="
                                display: inline-block;
                                padding: 10px 20px;
                                background-color: #007bff;
                                color: #ffffff;
                                text-decoration: none;
                                border-radius: 5px;
                            "
                            >Reset Password</a
                        >
                    </p>
                    <p>If you didn't request a password reset, please ignore this email.</p>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px 0; text-align: center; background-color: #111827; color: white">
                    <p>&copy; 2024 xsocial. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </body>
</html>
`;

        await sendEmail(existingUser.email, 'Password Reset', emailContent);

        return newToken;
    }
}
