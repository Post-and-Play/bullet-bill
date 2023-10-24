/* eslint eqeqeq: 'off' */
/* eslint no-redeclare: 'off' */
/* eslint no-unused-vars: 'off' */
/* eslint no-useless-concat: 'off' */
/* eslint no-use-before-define: 'off' */
/* eslint no-loop-func: 'off' */
/* eslint default-case: 'off' */
/* eslint no-mixed-operators: 'off' */
/* eslint default-case: 'off' */

import axios from 'axios';
import { getStorage } from "./Auth";

const test = false //process.env.REACT_APP_ISTEST;
var apiUrl = test ? process.env.REACT_APP_API_TEST : process.env.REACT_APP_API;

//console.log('test: ' + test);

const api = axios.create({
    baseURL: apiUrl
});

api.interceptors.request.use(async config => {
    const { Token } = await getStorage() !== null;
    if (Token) {
        config.headers.Authorization = `Bearer ${Token}`;
        // config.headers.XContentTypeOptions = 'no-sniff';
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default api;