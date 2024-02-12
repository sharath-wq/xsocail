export interface PostRequestModel {
    caption: string;
    tags: string[];
    imageUrls: string[];
}

export interface PostResponseModel {
    id: string;
    tags: string[];
    imaageUrl: string[];
}

export interface PostModel {
    id: string;
    authorId: string;
    caption: string;
    tags: string[];
    imageUrls: string[];
    likes: string[];
    comments: string[];
    createdAt: Date;
}
