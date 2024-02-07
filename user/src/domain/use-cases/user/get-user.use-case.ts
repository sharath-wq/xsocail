import { UserResponseModel } from '../../entities/user';
import { GetUserUseCase } from '../../interfaces/use-cases';
import { UserRepository } from '../../interfaces/repository/user.repository';

export class GetUser implements GetUserUseCase {
    UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(id: string): Promise<UserResponseModel | null> {
        const result = this.UserRepository.getUser(id);

        return result;
    }
}
