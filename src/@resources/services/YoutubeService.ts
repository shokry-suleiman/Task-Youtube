
import http from './BaseHttpService';
import { API_KEY } from '../config/config'
class YoutubeService {

	search(part: string, searchKey: string,
		   pageToken: string, type: string,
		   time:any,totalItemsPerPage: number) {
		return http.get(`search?part=${part}
							&q=${searchKey}&pageToken=${pageToken}
							&maxResults=${totalItemsPerPage}&type=${type}
							&publishedAfter=${time}&key=${API_KEY}`)
	}

};

export default new YoutubeService();
