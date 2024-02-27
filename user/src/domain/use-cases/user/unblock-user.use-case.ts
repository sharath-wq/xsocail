import { NotFoundError } from '@scxsocialcommon/errors';
import { UserRepository } from '../../interfaces/repository/user.repository';
import { UnblockUserUseCase } from '../../interfaces/use-cases/user';

export class UnblockUser implements UnblockUserUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(id: string): Promise<void> {
        const user = await this.UserRepository.getUser(id);

        if (!user) {
            throw new NotFoundError();
        }

        await this.UserRepository.updateUser(id, {
            isBlocked: false,
        });
    }
}
