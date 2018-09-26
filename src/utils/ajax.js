import axios from 'axios';

const ajax = axios.create({
    baseURL: `${window.location.protocol}//localhost`,
    timeout: 15000,
});

ajax.interceptors.request.use(config => config);

ajax.interceptors.response.use(
    response => response.data,
    error => {
        return Promise.reject(error);
    },
);

ajax.all = axios.all;
ajax.spread = axios.spread;

export default ajax;
