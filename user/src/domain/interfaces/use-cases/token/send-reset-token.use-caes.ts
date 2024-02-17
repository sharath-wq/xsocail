import { TokenModel } from '../../../entities/token';

export interface SendResetTokenUseCase {
    execute(email: string): Promise<TokenModel | null>;
}
