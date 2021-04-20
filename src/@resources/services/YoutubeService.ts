import http from './BaseHttpService';
import { API_KEY } from '../config/config'

class YoutubeService {

	search(part: string, order:string,
			 searchKey: string,
		   pageToken: string, type: string,
		   time:any,totalItemsPerPage: number) {
		return http.get(`search?part=${part}&order=${order}
							&q=${searchKey}&pageToken=${pageToken}
							&maxResults=${totalItemsPerPage}&type=${type}
							&publishedAfter=${time}&key=${API_KEY}`)
	}

	listChannel(part:string,channelId:string){
		return http.get(`channels?part=${part}&id=${channelId}&key=${API_KEY}`)
	}

	listPlaylistItems(part:string,playlistId:string,pageToken:string){
		return http.get(`playlistItems?part=${part}&playlistId=${playlistId}
						&pageToken=${pageToken}&key=${API_KEY}`)
	}

};
export default new YoutubeService();

