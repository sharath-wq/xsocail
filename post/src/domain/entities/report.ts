export interface IReport {
    timestamp: Date;
    postId: string;
    reporterId: string;
    reason: string;
    actionTaken: 'pending' | 'Post Removed' | 'Warning Issued';
}

export interface IReportReq {
    postId: string;
    reporterId: string;
    reason: string;
    actionTaken: 'pending' | 'Post Removed' | 'Warning Issued';
}

export interface IReportUpdate {
    timestamp?: Date;
    postId?: string;
    reporterId?: string;
    reason?: string;
    actionTaken: 'pending' | 'Post Removed' | 'Warning Issued';
}

export interface IReportResponse {
    id: string;
    timestamp: Date;
    postId: string;
    reporterId: string;
    reason: string;
    actionTaken: 'pending' | 'Post Removed' | 'Warning Issued';
}
