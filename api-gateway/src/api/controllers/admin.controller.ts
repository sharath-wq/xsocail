import { Request, Response, NextFunction } from 'express';
import { IAdminController } from '../interface/controllers/admin.controller';
import axios from 'axios';
import { POST_SERVICE_ENDPOINT, USER_SERVICE_ENDPOINT } from '../../constants/endpoints';

export class AdminController implements IAdminController {
    async dashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const usersResponse = await axios.get(USER_SERVICE_ENDPOINT);
            const postsResponse = await axios.get(POST_SERVICE_ENDPOINT);

            const userReportsResponse = await axios.get(`${USER_SERVICE_ENDPOINT}/reports`);
            const postReportsResponse = await axios.get(`${POST_SERVICE_ENDPOINT}/reports`);

            const popularPostsResponse = await axios.get(`${POST_SERVICE_ENDPOINT}/popular-posts`);

            const users = usersResponse.data;
            const posts = postsResponse.data;

            const userReports = userReportsResponse.data;
            const postReports = postReportsResponse.data;

            const popularPosts = popularPostsResponse.data;

            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            let chartData = daysOfWeek.map((day) => {
                const usersCreatedOnDay = users.filter((user: any) => {
                    const userCreatedAt = new Date(user.createdAt);
                    return userCreatedAt.getDay() === daysOfWeek.indexOf(day);
                });

                const postsCreatedOnDay = posts.filter((post: any) => {
                    const postCreatedAt = new Date(post.createdAt);
                    return postCreatedAt.getDay() === daysOfWeek.indexOf(day);
                });

                const userReportCreatedOnDay = userReports.filter((userReport: any) => {
                    const userReportCreatedAt = new Date(userReport.timestamp);
                    return userReportCreatedAt.getDay() === daysOfWeek.indexOf(day);
                });

                const postReportCreatedOnDay = postReports.filter((postReport: any) => {
                    const postReportCreatedAt = new Date(postReport.timestamp);
                    return postReportCreatedAt.getDay() === daysOfWeek.indexOf(day);
                });

                return {
                    name: day,
                    user: usersCreatedOnDay.length,
                    posts: postsCreatedOnDay.length,
                    userReport: userReportCreatedOnDay.length,
                    postReport: postReportCreatedOnDay.length,
                };
            });

            const cardData = [
                {
                    label: 'Total Users',
                    count: users.length,
                },
                {
                    label: 'Total Posts',
                    count: posts.length,
                },
                {
                    label: 'Total User Reports',
                    count: userReports.length,
                },
                {
                    label: 'Total Post Reports',
                    count: postReports.length,
                },
            ];

            res.send({ chartData, cardData, popularPosts });
        } catch (error: any) {
            res.status(error.response.status).send(error.response.data);
        }
    }
}
