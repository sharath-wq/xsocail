import { PostModel, PostRequestModel } from '../../entities/post';

export interface PostRepository {
    createPost(post: PostRequestModel, authorId: string): Promise<PostModel | null>;
    updatePost(id: string, post: PostRequestModel): Promise<PostModel | null>;
    getAllPosts(): Promise<PostModel[] | []>;
    deletePost(id: string): Promise<void>;
    getOnePost(id: string): Promise<PostModel | null>;
    getPostsByUser(authorId: string): Promise<PostModel[] | []>;
    getPostById(id: string): Promise<PostModel | null>;
}
