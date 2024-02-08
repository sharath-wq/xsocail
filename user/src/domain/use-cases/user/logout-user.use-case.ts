import { LogoutUseCase } from '../../interfaces/use-cases/logout-user.use-case';

export class Logout implements LogoutUseCase {
    async execute(): Promise<void> {
        return Promise.resolve();
    }
}
