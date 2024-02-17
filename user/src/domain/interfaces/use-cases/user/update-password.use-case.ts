import { UserRequestModel } from '../../../entities/user';

export interface UpdatePasswordUseCase {
    execute(userId: string, password: string): Promise<void>;
}
