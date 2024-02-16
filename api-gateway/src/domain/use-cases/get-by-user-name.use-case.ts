import { UserModel } from '../entities/user';
import { UserRepository } from '../interface/repository/user.repository';
import { GetByUsernameUseCase } from '../interface/use-cases/get-by-username.use-case';

export class GetByUsername implements GetByUsernameUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(username: string): Promise<UserModel | null> {
        const result = await this.UserRepository.getByUsername(username);
        return result;
    }
}
