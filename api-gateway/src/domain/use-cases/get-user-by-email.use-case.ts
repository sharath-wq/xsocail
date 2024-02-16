import { UserModel } from '../entities/user';
import { UserRepository } from '../interface/repository/user.repository';
import { GetUserByEmailUseCase } from '../interface/use-cases/get-user-by-email.use-case';

export class GetUserByEmail implements GetUserByEmailUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }
    async execute(email: string): Promise<UserModel | null> {
        const result = await this.UserRepository.getUserByEmail(email);
        return result;
    }
}
