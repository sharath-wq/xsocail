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
