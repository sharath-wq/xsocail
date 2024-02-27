import { BadRequestError, NotFoundError } from '@scxsocialcommon/errors';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { BlockUserUseCase } from '../../interfaces/use-cases/user';

export class BlockUser implements BlockUserUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(id: string): Promise<void> {
        const user = await this.UserRepository.getUser(id);

        if (!user) {
            throw new NotFoundError();
        }

        await this.UserRepository.updateUser(user.id, {
            isBlocked: true,
        });
    }
}
