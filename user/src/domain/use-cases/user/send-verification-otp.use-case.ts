import { NotFoundError } from '@scxsocialcommon/errors';
import { OtpReposiotry } from '../../interfaces/repository/otp.repository';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { SendVerificationOtpUseCase } from '../../interfaces/use-cases/user';
import { generateOtp } from '../../../utils/generate-otp';
import { OtpRequestModel } from '../../entities/otp';
import sendEmail from '../../../utils/sendEmail';

export class SendVerificationOtp implements SendVerificationOtpUseCase {
    userRepository: UserRepository;
    otpRepository: OtpReposiotry;

    constructor(userRepository: UserRepository, otpRepository: OtpReposiotry) {
        this.userRepository = userRepository;
        this.otpRepository = otpRepository;
    }

    async execute(email: string): Promise<void> {
        const ExistingUser = await this.userRepository.getUserByEmail(email);

        if (!ExistingUser) {
            throw new NotFoundError();
        }

        const otp: OtpRequestModel = {
            email: email,
            otp: generateOtp(),
        };

        const newOtp = await this.otpRepository.createOtp(otp);

        if (newOtp) {
            const emailContent = `<html lang="en">
                                    <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>xSocial - Verification OTP</title>
                                    </head>
                                    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
                                    <table style="width: 100%; background-color: #f5f5f5;">
                                        <tr>
                                        <td style="padding: 20px; text-align: center;">
                                            <h1>Verify Your Email Address</h1>
                                            <p>Hi ${ExistingUser.fullName},</p>
                                            <p>Thank you for signing up with xSocial. To complete your registration, please verify your email address using the following one-time password (OTP):</p>
                                            <h2>${newOtp!.otp}</h2>
                                            <p>This OTP is valid for only 30 seconds.</p>
                                            <p>Please enter the OTP on our website to complete your verification.</p>
                                            <p>If you did not request this verification, please ignore this email.</p>
                                            <br>
                                            <p>Sincerely,</p>
                                            <p>The xSocial Team</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td style="padding: 20px; text-align: center;">
                                            <p>&copy; xSocial 2024</p>
                                        </td>
                                        </tr>
                                    </table>
                                    </body>
                                    </html>`;

            sendEmail(email, 'Email Verification', emailContent);
        }
    }
}
