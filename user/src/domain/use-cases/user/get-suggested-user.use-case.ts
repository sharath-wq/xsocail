import { UserResponseModel } from '../../entities/user';
import { GetAllUserUseCase, GetSuggestedUsersUseCase } from '../../interfaces/use-cases/user';
import { UserRepository } from '../../interfaces/repository/user.repository';

export class GetSuggestedUser implements GetSuggestedUsersUseCase {
    UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }
    execute(query: string): Promise<UserResponseModel[] | []> {
        return this.UserRepository.getSuggested(query);
    }
}
