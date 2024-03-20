import {
    NotificationUserModel,
    UpdateUserRequstModel,
    UserModel,
    UserRequestModel,
    UserResponseModel,
} from '../../../domain/entities/user';
import { UserDataSource } from '../../interface/data-source/user-data-source';
import { User } from './schema/user.schema';

export class MongoDBUserDataSource implements UserDataSource {
    async getUserBatch(userIds: string[]): Promise<NotificationUserModel[] | []> {
        try {
            const results = await User.find({ _id: { $in: userIds } });

            return results.map((item) => ({
                id: item.id,
                imageUrl: item.imageUrl,
                username: item.username,
            }));
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getUserFriends(userId: string): Promise<UserResponseModel[] | []> {
        try {
            const user = await User.findById(userId);

            if (user) {
                const friends = await Promise.all(
                    user.following.map((friendId) => {
                        return User.findById(friendId);
                    })
                );

                return friends.map((item) => ({
                    id: item!.id,
                    bio: item!.bio,
                    followers: item!.followers,
                    following: item!.following,
                    savedPosts: item!.savedPosts,
                    username: item!.username,
                    email: item!.email,
                    fullName: item!.fullName,
                    createdAt: item!.createdAt,
                    isAdmin: item!.isAdmin,
                    imageUrl: item!.imageUrl,
                    posts: item!.posts,
                    verified: item!.verified,
                    isBlocked: item!.isBlocked,
                }));
            }

            return [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async follow(userId: string, followerId: string): Promise<void> {
        try {
            await User.findOneAndUpdate({ _id: userId }, { $addToSet: { following: followerId } });
            await User.findOneAndUpdate({ _id: followerId }, { $addToSet: { followers: userId } });
        } catch (error) {
            console.log(error);
        }
    }

    async unFollow(userId: string, followerId: string): Promise<void> {
        try {
            await User.findOneAndUpdate({ _id: userId }, { $pull: { following: followerId } });
            await User.findOneAndUpdate({ _id: followerId }, { $pull: { followers: userId } });
        } catch (error) {
            console.log(error);
        }
    }

    async addToSaved(userId: string, postId: string): Promise<void> {
        try {
            await User.findOneAndUpdate({ _id: userId }, { $push: { savedPosts: postId } });
        } catch (error) {
            console.log(error);
            throw new Error('Failed to add post to saved');
        }
    }

    async removeFromSaved(userId: string, postId: string): Promise<void> {
        try {
            await User.findByIdAndUpdate(userId, {
                $pull: { savedPosts: postId },
            });
        } catch (error) {
            console.log(error);
        }
    }

    async updateProfileImage(userId: string, imageUrl: string): Promise<UserResponseModel | null> {
        try {
            const updateduser = await User.findByIdAndUpdate(userId, { imageUrl: imageUrl }, { new: true });

            if (updateduser) {
                return {
                    id: updateduser.id,
                    bio: updateduser.bio,
                    followers: updateduser.followers,
                    following: updateduser.following,
                    savedPosts: updateduser.savedPosts,
                    username: updateduser.username,
                    email: updateduser.email,
                    fullName: updateduser.fullName,
                    createdAt: updateduser.createdAt,
                    isAdmin: updateduser.isAdmin,
                    imageUrl: updateduser.imageUrl,
                    posts: updateduser.posts,
                    verified: updateduser.verified,
                    isBlocked: updateduser.isBlocked,
                };
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async addPost(userId: string, postId: string): Promise<void> {
        try {
            const existingUser = await User.findById(userId);

            if (existingUser) {
                existingUser.posts.push(postId);
                existingUser.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deletePost(userId: string, postId: string): Promise<void> {
        try {
            const existingUser = await User.findById(userId);

            if (existingUser) {
                existingUser.posts = existingUser.posts.filter((id) => id !== postId);
                existingUser.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updatePassword(id: string, password: string): Promise<void> {
        try {
            const existingUser = await User.findById(id);

            if (existingUser) {
                existingUser.password = password;
                await existingUser.save();
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getAll(query: string): Promise<UserResponseModel[]> {
        try {
            let users;
            if (query) {
                users = await User.find({
                    $or: [{ username: { $regex: query, $options: 'i' } }, { fullName: { $regex: query, $options: 'i' } }],
                }).limit(10);
            } else {
                users = await User.find({}).limit(10);
            }

            return users.map((item) => ({
                id: item.id,
                bio: item.bio,
                followers: item.followers,
                following: item.following,
                savedPosts: item.savedPosts,
                username: item.username,
                email: item.email,
                fullName: item.fullName,
                createdAt: item.createdAt,
                isAdmin: item.isAdmin,
                imageUrl: item.imageUrl,
                posts: item.posts,
                verified: item.verified,
                isBlocked: item.isBlocked,
            }));
        } catch (error: any) {
            console.log('Error Finding User:', error.message);
            return [];
        }
    }

    async create(user: UserRequestModel): Promise<UserResponseModel | null> {
        try {
            const result = await User.create(user);
            if (result) {
                return {
                    id: result.id,
                    bio: result.bio,
                    followers: result.followers,
                    following: result.following,
                    savedPosts: result.savedPosts,
                    username: result.username,
                    email: result.email,
                    fullName: result.fullName,
                    createdAt: result.createdAt,
                    isAdmin: result.isAdmin,
                    imageUrl: result.imageUrl,
                    posts: result.posts,
                    verified: result.verified,
                    isBlocked: result.isBlocked,
                };
            } else {
                return null;
            }
        } catch (error: any) {
            console.log(error);

            console.log('Error Creating User');
            return null;
        }
    }

    async deleteOne(id: string): Promise<void> {
        await User.findByIdAndDelete(id);
    }

    async updateOne(id: string, user: UpdateUserRequstModel): Promise<UserResponseModel | null> {
        try {
            const existingUser = await User.findByIdAndUpdate(id, user, { new: true });

            if (existingUser) {
                return {
                    id: existingUser.id,
                    bio: existingUser.bio,
                    followers: existingUser.followers,
                    following: existingUser.following,
                    savedPosts: existingUser.savedPosts,
                    username: existingUser.username,
                    email: existingUser.email,
                    fullName: existingUser.fullName,
                    createdAt: existingUser.createdAt,
                    isAdmin: existingUser.isAdmin,
                    imageUrl: existingUser.imageUrl,
                    posts: existingUser.posts,
                    verified: existingUser.verified,
                    isBlocked: existingUser.isBlocked,
                };
            } else {
                return null;
            }
        } catch (error) {
            console.log('Error Creating User');
            return null;
        }
    }
    async getOne(id: string): Promise<UserResponseModel | null> {
        try {
            const result = await User.findById(id);

            if (result) {
                return {
                    id: result.id,
                    bio: result.bio,
                    followers: result.followers,
                    following: result.following,
                    savedPosts: result.savedPosts,
                    username: result.username,
                    email: result.email,
                    fullName: result.fullName,
                    createdAt: result.createdAt,
                    isAdmin: result.isAdmin,
                    imageUrl: result.imageUrl,
                    posts: result.posts,
                    verified: result.verified,
                    isBlocked: result.isBlocked,
                };
            } else {
                return null;
            }
        } catch (error) {
            console.log('Cant find User');
            return null;
        }
    }

    async findByEmail(email: string): Promise<UserModel | null> {
        try {
            const result = await User.findOne({ email: email });

            if (result) {
                return {
                    id: result.id,
                    bio: result.bio,
                    followers: result.followers,
                    folowing: result.following,
                    savedPosts: result.savedPosts,
                    username: result.username,
                    email: result.email,
                    fullName: result.fullName,
                    createdAt: result.createdAt,
                    isAdmin: result.isAdmin,
                    imageUrl: result.imageUrl,
                    password: result.password,
                    posts: result.posts,
                    verified: result.verified,
                };
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    async findByUsername(username: string): Promise<UserResponseModel | null> {
        try {
            const result = await User.findOne({ username: username });

            if (result) {
                return {
                    id: result.id,
                    bio: result.bio,
                    followers: result.followers,
                    following: result.following,
                    savedPosts: result.savedPosts,
                    username: result.username,
                    email: result.email,
                    fullName: result.fullName,
                    createdAt: result.createdAt,
                    isAdmin: result.isAdmin,
                    imageUrl: result.imageUrl,
                    posts: result.posts,
                    verified: result.verified,
                    isBlocked: result.isBlocked,
                };
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
}
