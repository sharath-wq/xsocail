import { BadRequestError, NotFoundError } from '@scxsocialcommon/errors';
import { OtpReposiotry } from '../../interfaces/repository/otp.repository';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { VerifyUserEmailUseCase } from '../../interfaces/use-cases/user';

export class VerifyUserEmail implements VerifyUserEmailUseCase {
    userRepository: UserRepository;
    otpRepository: OtpReposiotry;

    constructor(userRepository: UserRepository, otpRepository: OtpReposiotry) {
        this.userRepository = userRepository;
        this.otpRepository = otpRepository;
    }

    async execute(email: string, otp: string): Promise<void> {
        const existingOtp = await this.otpRepository.getOtpByEmail(email);

        if (!existingOtp) {
            throw new BadRequestError('Otp is invalid or expired');
        }

        if (existingOtp.otp !== otp) {
            throw new BadRequestError('Otp is Invalid');
        }

        const existingUser = await this.userRepository.getUserByEmail(email);

        if (!existingUser) {
            throw new NotFoundError();
        }

        await this.userRepository.updateUser(existingUser.id, {
            verified: true,
        });

        await this.otpRepository.deleteOtp(existingOtp.id);
    }
}
