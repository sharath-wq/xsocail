import { LoginResponseModel } from '../../../entities/user';

export interface LoginUseCase {
    execute(email: string, password: string): Promise<LoginResponseModel | null>;
}
