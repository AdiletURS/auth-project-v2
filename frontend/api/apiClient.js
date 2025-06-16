import axios from "axios";
import {useRouter} from "vue-router";

const axiosClient = axios.create({
    baseURL: "http://0.0.0.0:3000/api",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const router = useRouter();

        const res = error.response;
        if (res.status === 401) {
            router.push({path: "/"})
        }
        console.error(res.status);

        return Promise.reject(error);
    }
);

export {axiosClient};