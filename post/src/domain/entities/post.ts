export interface PostRequestModel {
    caption: string;
    tags: string[];
    imageUrls: string[];
    author: string;
}

export interface PostResponseModel {
    id: string;
    tags: string[];
    imaageUrl: string[];
}

export interface PostModel {
    id: string;
    author: string;
    caption: string;
    tags: string[];
    imageUrls: string[];
    likes: string[];
    comments: string[];
    createdAt: Date;
}
