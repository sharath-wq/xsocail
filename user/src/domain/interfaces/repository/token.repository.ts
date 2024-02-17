import { TokenModel, TokenRequestModel } from '../../entities/token';

export interface TokenRepository {
    createToken(token: TokenRequestModel): Promise<TokenModel | null>;
    getTokenByTokenId(tokenId: string): Promise<TokenModel | null>;
    updateToken(id: string, token: TokenModel): Promise<TokenModel | null>;
    deleteTokenByUserIdAndToken(userId: string, token: string): Promise<void>;
    getTokenByUserId(userId: string): Promise<TokenModel | null>;
    getTokenByUserIdAndToken(userId: string, token: string): Promise<TokenModel | null>;
}
