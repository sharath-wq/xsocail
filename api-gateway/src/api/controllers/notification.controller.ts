import { Request, Response, NextFunction } from 'express';
import { INotificationController } from '../interface/controllers/notification.controller';
import axios from 'axios';
import { NOTIFICATION_SERVICE_ENDPOINT, POST_SERVICE_ENDPOINT, USER_SERVICE_ENDPOINT } from '../../constants/endpoints';
import { INotification } from '../../domain/entities/notifications';
import { UserResponseModel } from '../../domain/entities/user';
import { PostModel } from '../../domain/entities/post';

export class NotificationController implements INotificationController {
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

            const newNotifications = updatedNotifications.filter((n: INotification) => n.isRead);
            const oldNotifications = updatedNotifications.filter((n: INotification) => !n.isRead);

            res.send({ newNotifications, oldNotifications });
        } catch (error: any) {
            res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
        }
    }
}
