export interface IAuthor {
    userId: string;
    username: string;
    imageUrl: string;
}

export interface IComment extends Document {
    postId: string;
    author: IAuthor;
    content: string;
    likes: string[];
    createdAt: Date;
}

export interface ICommentRequestModel {
    author: IAuthor;
    postId: string;
    content: string;
}

export interface ICommentResponseModel {
    id: string;
    postId: string;
    author: IAuthor;
    content: string;
    likes: string[];
    createdAt: Date;
}
