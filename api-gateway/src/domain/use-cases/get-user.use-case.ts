import { UserModel } from '../entities/user';
import { UserRepository } from '../interface/repository/user.repository';
import { GetUserUseCase } from '../interface/use-cases/get-user.use-case';

export class GetUser implements GetUserUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }
    async execute(userId: string): Promise<UserModel | null> {
        const result = await this.UserRepository.getUser(userId);

        return result;
    }
}
