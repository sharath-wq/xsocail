import { PostModel, PostRequestModel } from '../../../domain/entities/post';

export interface PostDataSource {
    create(post: PostRequestModel, authorId: string): Promise<PostModel | null>;
    updateOne(id: string, post: PostRequestModel): Promise<PostModel | null>;
    getAll(): Promise<PostModel[] | []>;
    deleteOne(id: string): Promise<void>;
    getOne(id: string): Promise<PostModel | null>;
    findByAuthor(authorId: string): Promise<PostModel[] | []>;
    getPostById(id: string): Promise<PostModel | null>;
    likeAPost(userId: string, postId: string): Promise<void>;
    disLikeAPost(userIndex: number, postId: string): Promise<void>;
    getUserFeed(): Promise<PostModel[] | []>;
}
