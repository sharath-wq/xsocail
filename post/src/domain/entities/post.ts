export interface PostRequestModel {
    caption: string;
    tags: string[];
    imageUrls: string[];
    author: {
        userId: string;
        username: string;
        imageUrl: string;
    };
    isEdited: boolean;
}

export interface PostBulkUpdateRequestModel {
    author: {
        imageUrl: string;
        userId: string;
        username: string;
    };
}

export interface PostModel {
    id: string;
    author: {
        userId: string;
        username: string;
        imageUrl: string;
    };
    caption: string;
    tags: string[];
    imageUrls: string[];
    likes: string[];
    comments: string[];
    createdAt: Date;
    isEdited: boolean;
}
