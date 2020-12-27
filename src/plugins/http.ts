import axios from 'axios';

export default axios.create({
    baseURL: `${process.env.VUE_APP_REST_URL}`,
});
