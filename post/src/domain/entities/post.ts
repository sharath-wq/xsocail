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
    reportedBy?: string[];
}

export interface PostBulkUpdateRequestModel {
    author: {
        imageUrl: string;
        userId: string;
        username: string;
    };
}

export interface NotificationPostModel {
    id: string;
    imageUrls: string[];
    author: {
        userId: string;
        username: string;
        imageUrl: string;
    };
    reportedBy: string[];
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
    reportedBy: string[];
    isDeleted: boolean;
}
export interface PostUpdateModel {
    caption?: string;
    tags?: string[];
    createdAt?: Date;
    isEdited?: boolean;
    reportedBy?: string[];
    isDeleted?: boolean;
    actionTaken?: 'Pending' | 'Post Removed' | 'Warning Issued' | 'User Blocked';
}
