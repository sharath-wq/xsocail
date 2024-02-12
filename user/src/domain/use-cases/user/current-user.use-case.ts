import { CurrentUserUseCase } from '../../interfaces/use-cases/current-user.use-case';

export class CurrentUser implements CurrentUserUseCase {
    async execute(): Promise<void> {
        return Promise.resolve();
    }
}
