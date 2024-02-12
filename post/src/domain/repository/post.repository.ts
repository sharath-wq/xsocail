import { PostModel, PostRequestModel } from '../entities/post';
import { PostRepository } from '../interfaces/repository/post.repository';
import { PostDataSource } from '../../data/interface/data-source/post-data-source';

export class PostRepositoryImpl implements PostRepository {
    postDataSource: PostDataSource;

    constructor(postDataSource: PostDataSource) {
        this.postDataSource = postDataSource;
    }

    async createPost(post: PostRequestModel, authorId: string): Promise<PostModel | null> {
        const result = await this.postDataSource.create(post, authorId);
        return result;
    }

    async updatePost(id: string, post: PostRequestModel): Promise<PostModel | null> {
        const result = await this.postDataSource.updateOne(id, post);
        return result;
    }

    async getAllPosts(): Promise<PostModel[] | []> {
        const result = await this.postDataSource.getAll();
        return result;
    }

    async deletePost(id: string): Promise<void> {
        await this.postDataSource.deleteOne(id);
    }

    async getOnePost(id: string): Promise<PostModel | null> {
        const result = await this.postDataSource.getOne(id);
        return result;
    }

    async getPostsByUser(authorId: string): Promise<PostModel[] | []> {
        const result = await this.postDataSource.findByAuthor(authorId);
        return result;
    }

    async getPostById(id: string): Promise<PostModel | null> {
        const result = await this.postDataSource.getPostById(id);
        return result;
    }
}
