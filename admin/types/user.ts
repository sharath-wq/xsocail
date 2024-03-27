export type User = {
    id: string;
    email: string;
    username: string;
    following: number;
    followers: number;
    posts: number;
    isBlocked: boolean;
};

export type UserData = {
    bio: string;
    createdAt: string;
    email: string;
    followers: string[];
    following: string[];
    fullName: string;
    id: string;
    imageUrl: string;
    isAdmin: boolean;
    posts: string[];
    savedPosts: string[];
    username: string;
    verified: boolean;
    isBlocked: boolean;
    reportedBy: string[];
};

export type UserReport = {
    timestamp: string;
    userId: string;
    reporterId: string;
    reason: string;
    actionTaken: string;
    id: string;
    imageUrl: string;
    username: string;
    reportedBy: string[];
};

export type PostReport = {
    timestamp: string;
    userId: string;
    id: string;
    reason: string;
    actionTaken: string;
    postId: string;
    reportId: string;
    imageUrls: string[];
    author: {
        userId: string;
        username: string;
        imageUrl: string;
    };
    reportedBy: string[];
};

export type Report = {
    timestamp: Date;
    userId: string;
    reporterId: string;
    reason: string;
    actionTaken: string;
};
