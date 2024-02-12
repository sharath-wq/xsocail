import { PostModel, PostRequestModel, PostResponseModel } from '../../entities/post';

export interface PostRepository {
    createPost(post: PostRequestModel, authorId: string): Promise<PostResponseModel | null>;
    updatePost(id: string, post: PostRequestModel): Promise<PostResponseModel | null>;
    getAllPosts(): Promise<PostModel[] | []>;
    deletePost(id: string): Promise<void>;
    getOnePost(id: string): Promise<PostModel | null>;
    getPostsByUser(authorId: string): Promise<PostModel[] | []>;
    getPostById(id: string): Promise<PostModel | null>;
}
