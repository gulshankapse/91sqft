import axios from "axios";
import { defer } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export const detailsPageLoader = async ({ params }) => {
    const res = await axios.get(`${API_URL}/posts/${params.id}`, {
        withCredentials: true,
    });
    return res.data;
};

export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1];
    const postPromise = axios.get(`${API_URL}/posts?${query}`, {
        withCredentials: true,
    });
    return defer({
        postResponse: postPromise,
    });
};

export const myListLoader = async () => {
    const postPromise = axios.get(`${API_URL}/users/posts`, {
        withCredentials: true,
    });
    const chatPromise = axios.get(`${API_URL}/chats`, {
        withCredentials: true,
    });

    return defer({
        postResponse: postPromise,
        chatResponse: chatPromise,
    });
};
