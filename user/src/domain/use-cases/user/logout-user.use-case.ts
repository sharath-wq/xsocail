import { LogoutUseCase } from '../../interfaces/use-cases/user/logout-user.use-case';

export class Logout implements LogoutUseCase {
    async execute(): Promise<void> {
        return Promise.resolve();
    }
}
