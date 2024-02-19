import { TokenModel, TokenRequestModel } from '../../../domain/entities/token';

export interface TokenDataSource {
    create(token: TokenRequestModel): Promise<TokenModel | null>;
    getTokenByTokenId(tokenId: string): Promise<TokenModel | null>;
    update(id: string, token: TokenModel): Promise<TokenModel | null>;
    deleteTokenByUserIdAndToken(userId: string, token: string): Promise<void>;
    getTokenByUserId(userId: string): Promise<TokenModel | null>;
    getTokenByUserIdAndToken(userId: string, token: string): Promise<TokenModel | null>;
}
