import { UserResponseModel } from '../../entities/user';
import { GetAllUserUseCase } from '../../interfaces/use-cases/user';
import { UserRepository } from '../../interfaces/repository/user.repository';

export class GetAllUsers implements GetAllUserUseCase {
    UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(): Promise<[] | UserResponseModel[]> {
        const result = await this.UserRepository.getUsers();
        return result;
    }
}
