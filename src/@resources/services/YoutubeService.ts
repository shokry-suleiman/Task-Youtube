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

	listChannelSections(part:string,channelId:string){
		return http.get(`channelSections?part=${part}&channelId=${channelId}&key=${API_KEY}`)
	}

	listChannelPlaylists(part:string,channelId:string,pageToken: string,totalItemsPerPage:number) {
		return http.get(`playlists?part=${part}&channelId=${channelId}
						&maxResults=${totalItemsPerPage}&pageToken=${pageToken}&key=${API_KEY}`)
	}

	listChannelVideos(){
		
	}
	
	listPlaylistItems(part:string,playlistId:string,pageToken:string,totalItemsPerPage:number){
		return http.get(`playlistItems?part=${part}&playlistId=${playlistId}
						&pageToken=${pageToken}&maxResults=${totalItemsPerPage}&key=${API_KEY}`)
	}

	listVideoDetails(part:string,videoId:string,pageToken:string,totalItemsPerPage:number){
		return http.get(`videos?part=${part}&id=${videoId}
						&pageToken=${pageToken}&maxResults=${totalItemsPerPage}
						&key=${API_KEY}`)
	}


	listRelatedVideos(part:string,videoId:string,type:string,pageToken:string,totalItemsPerPage:number){
		return http.get(`search?part=${part}&relatedToVideoId=${videoId}
						&type=${type}&pageToken=${pageToken}&maxResults=${totalItemsPerPage}
						&key=${API_KEY}`)
	}

};
export default new YoutubeService();

