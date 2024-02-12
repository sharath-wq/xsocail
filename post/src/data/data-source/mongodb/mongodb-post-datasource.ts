import { PostModel, PostRequestModel, PostResponseModel } from '../../../domain/entities/post';
import { PostDataSource } from '../../interface/data-source/post-data-source';

import { Post } from './schema/post.schema';

export class MongoDBPostDataSource implements PostDataSource {
    async findByAuthor(authorId: string): Promise<PostModel[] | []> {
        try {
            const results = await Post.find({ authorId });

            return results.map((item) => ({
                id: item.id,
                author: item.authorId,
                content: item.content || '',
                media: item.media,
                likes: item.likes,
                comments: item.comments,
                createdAt: item.createdAt,
                tags: item.tags,
            }));
        } catch (error) {
            console.error('Error finding Posts by author', error);
            throw error;
        }
    }
    async updateOne(id: string, post: PostRequestModel): Promise<PostResponseModel | null> {
        try {
            const result = await Post.findByIdAndUpdate(id, post);

            if (result) {
                return {
                    id: result.id,
                    author: result.authorId,
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error updating Post', error);
            return null;
        }
    }

    async create(post: PostRequestModel, authorId: string): Promise<PostResponseModel | null> {
        try {
            const result = await Post.create({
                authorId: authorId,
                ...post,
            });
            if (result) {
                return {
                    id: result.id,
                    author: result.authorId,
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error creating Post', error);
            return null;
        }
    }

    async getAll(): Promise<PostModel[] | []> {
        try {
            const result = await Post.find({});

            return result.map((item) => ({
                id: item.id,
                author: item.authorId,
                content: item.content || '',
                media: item.media,
                likes: item.likes,
                comments: item.comments,
                createdAt: item.createdAt,
                tags: item.tags,
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
            const result = await Post.findById(id);

            if (result) {
                return {
                    id: result.id,
                    author: result.authorId,
                    content: result.content || '',
                    media: result.media,
                    likes: result.likes,
                    comments: result.comments,
                    createdAt: result.createdAt,
                    tags: result.tags,
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
            const result = await Post.findById(id);

            if (result) {
                return {
                    id: result.id,
                    author: result.authorId,
                    content: result.content || '',
                    media: result.media,
                    likes: result.likes,
                    comments: result.comments,
                    createdAt: result.createdAt,
                    tags: result.tags,
                };
            }

            return null;
        } catch (error) {
            console.error('Error getting Post', error);
            throw error;
        }
    }
}
