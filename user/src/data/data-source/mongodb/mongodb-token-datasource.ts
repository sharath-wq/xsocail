import { TokenModel, TokenRequestModel } from '../../../domain/entities/token';
import { TokenDataSource } from '../../interface/data-source/token-data-source';
import { Token } from './schema/token.schema';

export class MongoDBTokenDataSource implements TokenDataSource {
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
    async delete(id: string): Promise<void> {
        try {
            const result = await Token.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
}
