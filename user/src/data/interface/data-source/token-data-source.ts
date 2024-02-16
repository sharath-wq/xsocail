import { TokenModel, TokenRequestModel } from '../../../domain/entities/token';

export interface TokenDataSource {
    create(token: TokenRequestModel): Promise<TokenModel | null>;
    getTokenByTokenId(tokenId: string): Promise<TokenModel | null>;
    update(id: string, token: TokenModel): Promise<TokenModel | null>;
    delete(id: string): Promise<void>;
    getTokenByUserId(userId: string): Promise<TokenModel | null>;
}
