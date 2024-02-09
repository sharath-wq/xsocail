import axios, { AxiosInstance } from 'axios';

interface CreateAxiosInstanceProps {
    req: { headers: any };
}

const createAxiosInstance = ({ req }: CreateAxiosInstanceProps): AxiosInstance => {
    if (typeof window === 'undefined') {
        // Server
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers,
        });
    } else {
        // Client
        return axios.create({
            baseURL: '/',
        });
    }
};

export default createAxiosInstance;
