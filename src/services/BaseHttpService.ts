import axios from 'axios';

export const BaseHttpService = axios.create({
	baseURL: `https://www.googleapis.com/youtube/v3`,
	headers: {
	}
})