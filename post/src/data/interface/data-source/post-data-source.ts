import { PostModel, PostRequestModel, PostResponseModel } from '../../../domain/entities/post';

export interface PostDataSource {
    create(post: PostRequestModel, authorId: string): Promise<PostResponseModel | null>;
    updateOne(id: string, post: PostRequestModel): Promise<PostResponseModel | null>;
    getAll(): Promise<PostModel[] | []>;
    deleteOne(id: string): Promise<void>;
    getOne(id: string): Promise<PostModel | null>;
    findByAuthor(authorId: string): Promise<PostModel[] | []>;
    getPostById(id: string): Promise<PostModel | null>;
}
