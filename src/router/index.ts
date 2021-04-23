import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home/Home.vue'
import YoutubeSearch from '../views/YoutubeSearch/YoutubeSearch.vue';
import YoutubeVideoDetails from '../views/YoutubeVideoDetails/YoutubeVideoDetails.vue';
import YoutubeChannelDetails from '../views/YoutubeChannelDetails/YoutubeChannelDetails.vue';
import YoutubeVideo from '../views/YoutubeVideo/YoutubeVideo.vue';
import YoutubePlaylistDetails from '../views/YoutubePlaylistDetails/YoutubePlaylistDetails.vue';


const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		children: [
			{
				path: '/',
				redirect: '/search'
			},
			{
				path: 'search',
				name: 'Search',
				component: YoutubeSearch
			},
			{
				path: 'video',
				name: 'Details',
				component:YoutubeVideo ,
				children: [
					{
						path: 'video/:videoId',
						name: 'Video',
						component: YoutubeVideoDetails
					},
					{
						path: 'playlist/:playlistId',
						name: 'Playlist',
						component: YoutubePlaylistDetails
					},
				]
			},
			{
				path: 'channel/:channelId',
				name: 'Channel',
				component: YoutubeChannelDetails
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
