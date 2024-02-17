import { token } from 'morgan';
import { TokenDataSource } from '../../data/interface/data-source/token-data-source';
import { TokenModel, TokenRequestModel } from '../entities/token';
import { TokenRepository } from '../interfaces/repository/token.repository';

export class TokenRepositoryImpl implements TokenRepository {
    tokenDataSource: TokenDataSource;

    constructor(tokenDataSource: TokenDataSource) {
        this.tokenDataSource = tokenDataSource;
    }
    async deleteTokenByUserIdAndToken(userId: string, token: string): Promise<void> {
        await this.tokenDataSource.deleteTokenByUserIdAndToken(userId, token);
    }
    async getTokenByUserIdAndToken(userId: string, token: string): Promise<TokenModel | null> {
        const result = await this.tokenDataSource.getTokenByUserIdAndToken(userId, token);
        return result;
    }
    async getTokenByUserId(userId: string): Promise<TokenModel | null> {
        const result = await this.tokenDataSource.getTokenByUserId(userId);
        return result;
    }
    async createToken(token: TokenRequestModel): Promise<TokenModel | null> {
        const result = await this.tokenDataSource.create(token);
        return result;
    }
    async getTokenByTokenId(tokenId: string): Promise<TokenModel | null> {
        const result = await this.tokenDataSource.getTokenByTokenId(tokenId);
        return result;
    }
    async updateToken(id: string, token: TokenModel): Promise<TokenModel | null> {
        const result = await this.tokenDataSource.update(id, token);
        return result;
    }
}
