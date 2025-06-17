import axios from "axios";
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
        const errMsg = status === 401 ? err.response.data.message : "";

        if (status === 401 && errMsg !== "Неверные учетные данные") {
            // Token has expired and has to be refreshed
            const refreshToken = localStorage.getItem("refreshToken");

            console.warn("getting new tokens...");
            try {
                const newTokens = await refresh(refreshToken);
                console.warn("got new tokens yipee", newTokens);

                setTokens(newTokens.data);

                console.log("retrying previous request");
                return axiosClient(err.config);
            } catch (err) {
                // Failed to refresh tokens, probably due to invalid refreshToken
                setTokens();
                console.error("Failed getting new tokens, refreshToken may was invalid.");
                return Promise.reject(err);
            }
        } else {
            // Just reject the promise on any other status code
            return Promise.reject(err);
        }
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

// Leaving empty data param will remove the tokens
const setTokens = (data = null) => {
    if (data) {
        console.log("renew tokens");
        const {accessToken, refreshToken} = data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    } else {
        console.log("removed tokens");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
}

const hasAnyTokens = () => {
    return (localStorage.getItem("accessToken") ||
        localStorage.getItem("refreshToken"));
}

export {axiosClient, setTokens, hasAnyTokens};