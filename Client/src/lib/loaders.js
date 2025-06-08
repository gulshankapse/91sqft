import axios from "axios";
import { defer } from "react-router-dom";

export const detailsPageLoader = async ({ params }) => {
    const res = await axios.get(`http://localhost:8800/posts/${params.id}`, {
        withCredentials: true,
    });
    return res.data;
};

export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1];
    const postPromise = axios.get(`http://localhost:8800/posts?${query}`, {
        withCredentials: true,
    });
    return defer({
        postResponse: postPromise,
    });
};

export const myListLoader = async () => {
    const postPromise = axios.get("http://localhost:8800/users/posts", {
        withCredentials: true,
    });
    const chatPromise = axios.get("http://localhost:8800/chats", {
        withCredentials: true,
    });

    return defer({
        postResponse: postPromise,
        chatResponse: chatPromise,
    });
};
