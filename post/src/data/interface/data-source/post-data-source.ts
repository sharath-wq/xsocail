import {
    NotificationPostModel,
    PostBulkUpdateRequestModel,
    PostModel,
    PostRequestModel,
    PostUpdateModel,
} from '../../../domain/entities/post';

export interface PostDataSource {
    create(post: PostRequestModel, authorId: string): Promise<PostModel | null>;
    updateOne(id: string, post: PostUpdateModel): Promise<PostModel | null>;
    getAll(q: string): Promise<PostModel[] | []>;
    deleteOne(id: string): Promise<void>;
    getOne(id: string): Promise<PostModel | null>;
    findByAuthor(authorId: string): Promise<PostModel[] | []>;
    getPostById(id: string): Promise<PostModel | null>;
    likeAPost(userId: string, postId: string): Promise<void>;
    disLikeAPost(userIndex: number, postId: string): Promise<void>;
    getUserFeed(userIds: string[]): Promise<PostModel[] | []>;
    getSavedPosts(postsIds: string[]): Promise<PostModel[] | []>;
    updatePostsByUserId(userId: string, post: PostBulkUpdateRequestModel): Promise<void>;
    getBatchPost(postIds: string[]): Promise<NotificationPostModel[] | []>;
}
