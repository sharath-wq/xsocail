import { UpdateUserUseCase } from '../../interfaces/use-cases/user';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { UpdateUserRequstModel, UserRequestModel, UserResponseModel } from '../../entities/user';
import { BadRequestError } from '@scxsocialcommon/errors';

export class UpdateUser implements UpdateUserUseCase {
    UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }
    async execute(id: string, data: UpdateUserRequstModel): Promise<UserResponseModel | null> {
        const user = await this.UserRepository.getUser(id);

        if (user?.email !== data.email) {
            throw new BadRequestError("Email Can't be changed");
        }

        if (data?.username) {
            const isUsernameExist = await this.UserRepository.getUserByUsername(data.username);

            if (isUsernameExist && isUsernameExist.id !== id) {
                throw new BadRequestError('User name is already Exists');
            }
        }

        const result = await this.UserRepository.updateUser(id, data);
        return result;
    }
}
