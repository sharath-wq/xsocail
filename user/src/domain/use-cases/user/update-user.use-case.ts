import { UpdateUserUseCase } from '../../interfaces/use-cases';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { UserRequestModel, UserResponseModel } from '../../entities/user';

export class UpdateUser implements UpdateUserUseCase {
    UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }
    async execute(id: string, data: UserRequestModel): Promise<UserResponseModel | null> {
        const result = await this.UserRepository.updateUser(id, data);
        return result;
    }
}
