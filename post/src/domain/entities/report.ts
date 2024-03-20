export interface IReport {
    timestamp: Date;
    postId: string;
    reporterId: string;
    reason: string;
    actionTaken: string;
}

export interface IReportReq {
    postId: string;
    reporterId: string;
    reason: string;
    actionTaken?: string;
}

export interface IReportUpdate {
    timestamp?: Date;
    postId?: string;
    reporterId?: string;
    reason?: string;
    actionTaken?: string;
}

export interface IReportResponse {
    id: string;
    timestamp: Date;
    postId: string;
    reporterId: string;
    reason: string;
    actionTaken: string;
}
