// import { UpdateUserUseCase } from '../../interfaces/use-cases';
// import { UserRepository } from '../../interfaces/repository/user.repository';
// import { UserRequestModel, UserResponseModel } from '../../entities/user';
// import { BadRequestError } from '@scxsocialcommon/errors';

import { BadRequestError } from '@scxsocialcommon/errors';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { LoginUseCase } from '../../interfaces/use-cases/login.use-case';
import { Password } from '../../../utils/password';
import jwt from 'jsonwebtoken';

// export class UpdateUser implements UpdateUserUseCase {
//     UserRepository: UserRepository;

//     constructor(UserRepository: UserRepository) {
//         this.UserRepository = UserRepository;
//     }
//     async execute(id: string, data: UserRequestModel): Promise<UserResponseModel | null> {
//         const user = await this.UserRepository.getUser(id);

//         if (user?.email !== data.email) {
//             throw new BadRequestError("Email Can't be changed");
//         }

//         const isUsernameExist = await this.UserRepository.getUserByUsername(data.username);

//         // checking the username is belogns to the user
//         if (isUsernameExist && isUsernameExist.id !== id) {
//             throw new BadRequestError('User name is already Exists');
//         }

//         const result = await this.UserRepository.updateUser(id, data);
//         return result;
//     }
// }

export class Login implements LoginUseCase {
    UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(email: string, password: string): Promise<string> {
        const existingUser = await this.UserRepository.getUserByEmail(email);

        if (!existingUser) {
            throw new BadRequestError('Invalid Credentials');
        }

        const passwordMatch = await Password.compare(existingUser.password, password);

        if (!passwordMatch) {
            throw new BadRequestError('Invalid Credentialss');
        }

        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                isAdmin: existingUser.isAdmin,
                username: existingUser.username,
            },
            'jsonwebtoken'
        );

        return userJwt;
    }
}
