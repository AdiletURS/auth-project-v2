import axios from "axios";
import {useRouter} from "vue-router";
import {refresh} from "@/api/lib/auth.js";

const router = useRouter();

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
            // router.push({path: "/"})
            // попробовать обновить токен
            refresh(localStorage.getItem("refreshToken"))
                .then(res => {
                    if (!res.data) return;
                    refreshToken(res.data);
                    console.warn("JWT tokens were refreshed.")
                })
                .catch(err => {
                    if (err.status === 403) {
                        console.warn("refreshToken is invalid, redirecting to the home page.")
                        router.push({ name: "home" });
                        router.go(1);
                    }
                    console.error(err);
                });
        }
        console.error(res.status, res.data);

        return Promise.reject(error);
    }
);

axiosClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const refreshToken = (data) => {
    const { accessToken, refreshToken } = data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

export {axiosClient};