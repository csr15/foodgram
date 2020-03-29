import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://foodgram-15.firebaseio.com/'
});

export default instance;