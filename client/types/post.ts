export interface PostData {
    id: number;
    authorId: number;
    caption: string;
    tags: string[];
    imageUrls: string[];
    likes: string[];
    comments: string[];
    createdAt: Date;
}
