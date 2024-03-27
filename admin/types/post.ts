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
    reportedBy: string[];
    isDeleted: boolean;
}

export interface Post {
    id: string;
    author: {
        userId: string;
        username: string;
        imageUrl: string;
    };
    caption: string;
    tags: string[];
    imageUrls: string[];
    likes: number;
    comments: number;
    createdAt: Date;
    isEdited: boolean;
    reportedBy: number;
    isDeleted: boolean;
}
