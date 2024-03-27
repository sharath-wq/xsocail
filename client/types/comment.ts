export type Author = {
    userId: string;
    username: string;
    imageUrl: string;
};

export type CommentResponse = {
    id: string;
    postId: string;
    author: Author;
    content: string;
    likes: string[];
    createdAt: Date;
};

export type SingleCommentProps = {
    id: string;
    postId: string;
    author: Author;
    content: string;
    likes: string[];
    createdAt: Date;
    getComments: () => void;
};
