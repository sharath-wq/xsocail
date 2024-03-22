import {
    NotificationPostModel,
    PostBulkUpdateRequestModel,
    PostModel,
    PostRequestModel,
    PostUpdateModel,
} from '../../../domain/entities/post';
import { PostDataSource } from '../../interface/data-source/post-data-source';

import { Post } from './schema/post.schema';

export class MongoDBPostDataSource implements PostDataSource {
    async getBatchPost(postIds: string[]): Promise<[] | NotificationPostModel[]> {
        try {
            const results = await Post.find({ _id: { $in: postIds } });

            return results.map((item) => ({
                id: item.id,
                imageUrls: item.imageUrls,
                author: {
                    userId: item.author!.userId!,
                    username: item.author!.username!,
                    imageUrl: item.author!.imageUrl!,
                },
                reportedBy: item.reportedBy,
            }));
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async updatePostsByUserId(userId: string, post: PostBulkUpdateRequestModel): Promise<void> {
        try {
            await Post.updateMany({ 'author.userId': userId }, post);
        } catch (error) {
            console.log(error);
        }
    }

    async getSavedPosts(postsIds: string[]): Promise<[] | PostModel[]> {
        try {
            const results = await Post.find({ _id: { $in: postsIds }, isDeleted: false });

            return results.map((item) => ({
                id: item.id,
                author: {
                    userId: item.author!.userId!,
                    username: item.author!.username!,
                    imageUrl: item.author!.imageUrl!,
                },
                reportedBy: item.reportedBy,
                caption: item.caption,
                tags: item.tags,
                imageUrls: item.imageUrls,
                likes: item.likes,
                comments: item.comments,
                createdAt: item.createdAt,
                isEdited: item.isEdited,
                isDeleted: item.isDeleted,
            }));
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getUserFeed(userIds: string[]): Promise<[] | PostModel[]> {
        try {
            const result = await Post.find({ 'author.userId': { $in: userIds }, isDeleted: false }).sort({ createdAt: -1 });

            return result.map((item) => ({
                id: item.id,
                author: {
                    userId: item.author!.userId!,
                    username: item.author!.username!,
                    imageUrl: item.author!.imageUrl!,
                },
                caption: item.caption,
                reportedBy: item.reportedBy,
                tags: item.tags,
                imageUrls: item.imageUrls,
                likes: item.likes,
                comments: item.comments,
                createdAt: item.createdAt,
                isEdited: item.isEdited,
                isDeleted: item.isDeleted,
            }));
        } catch (error) {
            console.error('Error getting Post', error);
            return [];
        }
    }
    async likeAPost(userId: string, postId: string): Promise<void> {
        try {
            const post = await Post.findById(postId);
            if (post) {
                post.likes.push(userId);
                await post.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async disLikeAPost(userIndex: number, postId: string): Promise<void> {
        try {
            const post = await Post.findById(postId);
            if (post) {
                post.likes.splice(userIndex, 1);
                await post.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async findByAuthor(authorId: string): Promise<PostModel[] | []> {
        try {
            const results = await Post.find({ isDeleted: false });
            const userPosts = results.filter((item: any) => item.author.userId === authorId);
            if (userPosts && userPosts.length) {
                return userPosts.map((item) => ({
                    id: item.id,
                    author: {
                        userId: item.author!.userId!,
                        username: item.author!.username!,
                        imageUrl: item.author!.imageUrl!,
                    },
                    caption: item.caption,
                    reportedBy: item.reportedBy,
                    tags: item.tags,
                    imageUrls: item.imageUrls,
                    likes: item.likes,
                    comments: item.comments,
                    createdAt: item.createdAt,
                    isEdited: item.isEdited,
                    isDeleted: item.isDeleted,
                }));
            }

            return [];
        } catch (error) {
            console.error('Error finding Posts by author', error);
            throw error;
        }
    }

    async updateOne(id: string, post: PostUpdateModel): Promise<PostModel | null> {
        try {
            const result = await Post.findByIdAndUpdate(id, post);

            if (result) {
                return {
                    id: result.id,
                    author: {
                        userId: result.author!.userId!,
                        username: result.author!.username!,
                        imageUrl: result.author!.imageUrl!,
                    },
                    caption: result.caption,
                    reportedBy: result.reportedBy,
                    tags: result.tags,
                    imageUrls: result.imageUrls,
                    likes: result.likes,
                    comments: result.comments,
                    createdAt: result.createdAt,
                    isEdited: result.isEdited,
                    isDeleted: result.isDeleted,
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error updating Post', error);
            return null;
        }
    }

    async create(post: PostRequestModel, authorId: string): Promise<PostModel | null> {
        try {
            const result = await Post.create({
                authorId: authorId,
                ...post,
            });
            if (result) {
                return {
                    id: result.id,
                    author: {
                        userId: result.author!.userId!,
                        username: result.author!.username!,
                        imageUrl: result.author!.imageUrl!,
                    },
                    caption: result.caption,
                    reportedBy: result.reportedBy,
                    tags: result.tags,
                    imageUrls: result.imageUrls,
                    likes: result.likes,
                    comments: result.comments,
                    createdAt: result.createdAt,
                    isEdited: result.isEdited,
                    isDeleted: result.isDeleted,
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error creating Post', error);
            return null;
        }
    }

    async getAll(q: string): Promise<PostModel[] | []> {
        try {
            let results;
            if (q) {
                results = await Post.find({
                    $or: [{ caption: { $regex: q, $options: 'i' } }, { tags: { $regex: q, $options: 'i' } }],
                    isDeleted: false,
                }).limit(8);
            } else {
                const ids = await Post.aggregate([{ $sample: { size: 8 } }, { $project: { _id: 1 } }]);
                results = await Post.find({ _id: { $in: ids } });
            }

            return results.map((item) => ({
                id: item.id,
                author: {
                    userId: item.author!.userId!,
                    username: item.author!.username!,
                    imageUrl: item.author!.imageUrl!,
                },
                caption: item.caption,
                reportedBy: item.reportedBy,
                tags: item.tags,
                imageUrls: item.imageUrls,
                likes: item.likes,
                comments: item.comments,
                createdAt: item.createdAt,
                isEdited: item.isEdited,
                isDeleted: item.isDeleted,
            }));
        } catch (error) {
            console.error('Error getting Post', error);
            return [];
        }
    }

    async deleteOne(id: string): Promise<void> {
        try {
            await Post.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error deleting Post', error);
            throw error;
        }
    }

    async getPostById(id: string): Promise<PostModel | null> {
        try {
            const result = await Post.findOne({ _id: id });

            if (result) {
                return {
                    id: result.id,
                    author: {
                        userId: result.author!.userId!,
                        username: result.author!.username!,
                        imageUrl: result.author!.imageUrl!,
                    },
                    caption: result.caption,
                    reportedBy: result.reportedBy,
                    tags: result.tags,
                    imageUrls: result.imageUrls,
                    likes: result.likes,
                    comments: result.comments,
                    createdAt: result.createdAt,
                    isEdited: result.isEdited,
                    isDeleted: result.isDeleted,
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error getting Post', error);
            throw error;
        }
    }

    async getOne(id: string): Promise<PostModel | null> {
        try {
            const result = await Post.findOne({ _id: id });

            if (result) {
                return {
                    id: result.id,
                    author: {
                        userId: result.author!.userId!,
                        username: result.author!.username!,
                        imageUrl: result.author!.imageUrl!,
                    },
                    caption: result.caption,
                    reportedBy: result.reportedBy,
                    tags: result.tags,
                    imageUrls: result.imageUrls,
                    likes: result.likes,
                    comments: result.comments,
                    createdAt: result.createdAt,
                    isEdited: result.isEdited,
                    isDeleted: result.isDeleted,
                };
            }

            return null;
        } catch (error) {
            console.error('Error getting Post', error);
            throw error;
        }
    }
}
