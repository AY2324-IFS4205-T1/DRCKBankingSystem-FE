import axios from 'axios';
import { getCookie } from 'cookies-next';

const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_DJANGO_BASE_URL}`
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = `Token ${getCookie('token')}`;

    return config;
});

export default instance;