import {
    NotificationPostModel,
    PostBulkUpdateRequestModel,
    PostModel,
    PostRequestModel,
    PostUpdateModel,
} from '../../entities/post';

export interface PostRepository {
    createPost(post: PostRequestModel, authorId: string): Promise<PostModel | null>;
    updatePost(id: string, post: PostUpdateModel): Promise<PostModel | null>;
    getAllPosts(q: string): Promise<PostModel[] | []>;
    deletePost(id: string): Promise<void>;
    getOnePost(id: string): Promise<PostModel | null>;
    getPostsByUser(authorId: string): Promise<PostModel[] | []>;
    getPostById(id: string): Promise<PostModel | null>;
    likePost(userId: string, postId: string): Promise<void>;
    dislikePost(userIndex: number, postId: string): Promise<void>;
    getUserFeeds(userIds: string[]): Promise<PostModel[] | []>;
    getSavedPosts(postIds: string[]): Promise<PostModel[] | []>;
    findPostsByUserIdAndUpdate(userId: string, post: PostBulkUpdateRequestModel): Promise<void>;
    getBatchPost(postIds: string[]): Promise<NotificationPostModel[] | []>;
    getPopularPosts(): Promise<PostModel[] | []>;
}
