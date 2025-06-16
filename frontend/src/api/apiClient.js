import axios from "axios";
import {useRouter} from "vue-router";
import {refresh} from "@/api/services/auth.js";

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
    async (err) => {
        const status = err.response ? err.response.status : null;

        if (status === 401) {
            // Token has expired and has to be refreshed
            const refreshToken = localStorage.getItem("refreshToken");

            console.warn("getting new tokens...");
            try {
                const newTokens = await refresh(refreshToken);
                console.warn("got new tokens yipee", newTokens.data);

                setNewTokens(newTokens.data);
                await axiosClient.request(err.config);
            } catch (err) {
                // Failed to refresh tokens, probably due to invalid refreshToken
                console.error(err);
            }
        }

        return Promise.reject(err);
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


const setNewTokens = (data) => {
    const {accessToken, refreshToken} = data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

export {axiosClient};