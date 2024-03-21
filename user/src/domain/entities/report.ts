export interface Report {
    timestamp: Date;
    userId: string;
    reporterId: string;
    reason: string;
    actionTaken: 'Warning Issued' | 'Account Blocked' | 'Pending';
}

export interface ReportReq {
    userId: string;
    reporterId: string;
    reason: string;
    actionTaken?: 'Warning Issued' | 'Account Blocked' | 'Pending';
}

export interface ReportUpdate {
    timestamp?: Date;
    userId?: string;
    reporterId?: string;
    reason?: string;
    actionTaken?: 'Warning Issued' | 'Account Blocked' | 'Pending';
}

export interface ReportRes {
    timestamp: Date;
    userId: string;
    reporterId: string;
    reason: string;
    actionTaken: 'Warning Issued' | 'Account Blocked' | 'Pending';
}
