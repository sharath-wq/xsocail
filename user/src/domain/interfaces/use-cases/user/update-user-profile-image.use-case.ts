import { UpdateUserRequstModel, UserResponseModel } from '../../../entities/user';

export interface UpdateUserProfileImageUseCase {
    execute(userId: string, imageUrl: string): Promise<UserResponseModel | null>;
}
