
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

	listChannel(channelId:string){
		return http.get(`channels?part=snippet%2CcontentDetails%2Cstatistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=[YOUR_API_KEY]`)
	}

};

