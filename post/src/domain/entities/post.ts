export interface PostRequestModel {
    content: string;
    tags: string[];
}

export interface PostResponseModel {
    id: string;
    author: string;
}

export interface PostModel {
    id: string;
    author: string;
    content: string;
    media: string[];
    likes: string[];
    comments: string[];
    createdAt: Date;
    tags: string[];
}
