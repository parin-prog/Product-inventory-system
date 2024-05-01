import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL;
const jsonString = localStorage.getItem("persist:root") ?? '{}';
const user = JSON.parse(JSON.parse(jsonString)?.user ?? '{}') ?? {};
const accessToken = user.currentUser?.accessToken ?? '';

export const publicRequest = axios.create({
	baseURL: BASE_URL
})

export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: {token: `Bearer ${accessToken}`}
})