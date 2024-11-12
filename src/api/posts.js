import axios from 'axios';

export const getPosts = async (queryParams) => {
	const URL =
		`${import.meta.env.VITE_BACKEND_URL}/posts?` +
		new URLSearchParams(queryParams);
	const res = await axios.get(URL);
	return res;
};

export const createPost = async (post) => {
	const URL = `${import.meta.env.VITE_BACKEND_URL}/posts?`;
	const res = await axios.post(URL, post);
	return res;
};
