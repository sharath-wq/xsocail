import { Request, Response, NextFunction } from 'express';
import { INotificationController } from '../interface/controllers/notification.controller';
import axios from 'axios';
import { NOTIFICATION_SERVICE_ENDPOINT, POST_SERVICE_ENDPOINT, USER_SERVICE_ENDPOINT } from '../../constants/endpoints';
import { INotification } from '../../domain/entities/notifications';
import { UserResponseModel } from '../../domain/entities/user';
import { PostModel } from '../../domain/entities/post';

export class NotificationController implements INotificationController {
    async batchUpdate(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { ids } = req.body;
        const path = req.originalUrl.replace('/api/notifications', '');
        try {
            const response = await axios.patch(`${NOTIFICATION_SERVICE_ENDPOINT}${path}`, { ids });
            res.status(response.status).send(response.data);
        } catch (error: any) {
            res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
        }
    }

    async getAllUserNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId } = req.params;
        try {
            const { data: notifications } = await axios.get(`${NOTIFICATION_SERVICE_ENDPOINT}/${userId}`);

            const senderIds = notifications.map((n: INotification) => n.senderId);
            const postIds = notifications.map((n: INotification) => n.postId);

            const [userResponse, postResponse] = await Promise.all([
                axios.post(`${USER_SERVICE_ENDPOINT}/batch`, { ids: senderIds }),
                axios.post(`${POST_SERVICE_ENDPOINT}/batch`, { ids: postIds }),
            ]);

            const userMap = new Map(userResponse.data.map((u: UserResponseModel) => [u.id, u]));
            const postMap = new Map(postResponse.data.map((p: PostModel) => [p.id, p]));

            const updatedNotifications = notifications.map((n: INotification) => ({
                ...n,
                sender: userMap.get(n.senderId),
                post: postMap.get(n.postId),
            }));

            const newNotifications = updatedNotifications.filter((n: INotification) => n.isRead === false);
            const oldNotifications = updatedNotifications.filter((n: INotification) => n.isRead === true);

            res.send({ newNotifications, oldNotifications });
        } catch (error: any) {
            res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
        }
    }
}
