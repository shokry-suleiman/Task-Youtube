
import http from './BaseHttpService';
import { API_KEY } from '../config/config'
class YoutubeService {

	search(part: string, order: string, searchKey: string, pageToken: string, totalItemsPerPage: number) {
		return http.get(`search?part=${part}&order=${order}
							&q=${searchKey}&pageToken=${pageToken}
							&maxResults=${totalItemsPerPage}&key=${API_KEY}`)
	}

};

export default new YoutubeService();
