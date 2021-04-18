import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import YoutubeSearch from '../views/YoutubeSearch.vue';
import YoutubeVideoDetails from '../views/YoutubeVideoDetails.vue';
import YoutubeChannelDetails from '../views/YoutubeChannelDetails.vue';


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
				path: 'video/:videoId',
				name: 'Video',
				component: YoutubeVideoDetails
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
