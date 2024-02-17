import { TokenModel, TokenRequestModel } from '../../../domain/entities/token';
import { TokenDataSource } from '../../interface/data-source/token-data-source';
import { Token } from './schema/token.schema';

export class MongoDBTokenDataSource implements TokenDataSource {
    async deleteTokenByUserIdAndToken(userId: string, token: string): Promise<void> {
        try {
            await Token.findOneAndDelete({ userId, token });
        } catch (error) {
            console.log(error);
        }
    }

    async getTokenByUserIdAndToken(userId: string, token: string): Promise<TokenModel | null> {
        try {
            const result = await Token.findOne({ userId: userId, token: token });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getTokenByUserId(userId: string): Promise<TokenModel | null> {
        try {
            const result = await Token.findOne({ userId });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async create(token: TokenRequestModel): Promise<TokenModel | null> {
        try {
            const result = await Token.create(token);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getTokenByTokenId(tokenId: string): Promise<TokenModel | null> {
        try {
            const result = await Token.findById(tokenId);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async update(id: string, token: TokenModel): Promise<TokenModel | null> {
        try {
            const result = await Token.findByIdAndUpdate(id, token);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
