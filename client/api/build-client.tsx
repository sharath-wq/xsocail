import axios, { AxiosInstance } from 'axios';

interface CreateAxiosInstanceProps {
    req: { headers: any };
}

const createAxiosInstance = ({ req }: CreateAxiosInstanceProps): AxiosInstance => {
    if (typeof window === 'undefined') {
        // Server
        return axios.create({
            baseURL: 'http://api-gateway-srv:3000',
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
