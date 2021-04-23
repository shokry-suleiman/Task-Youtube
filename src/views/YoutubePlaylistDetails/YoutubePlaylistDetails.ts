import { Options, Vue } from "vue-class-component";
import { useRoute } from 'vue-router';
import YoutubeService from "../../@resources/services/YoutubeService";
import AppVideo from "../../components/AppVideo/AppVideo.vue";
@Options({
    components: {
        AppVideo
    },
    provide: {
        YoutubeService
    }
})
export default class YoutubePlaylistDetails extends Vue {

    playlistId!: any;
    part!: string;
    videoPart!:string
    pageToken: string = '';
    playListVideos!: any[];
    videoDetails!: any;
    loading:boolean =true;
    videoLoading:boolean = true;
    mounted() {
        this.playlistId = useRoute().params.playlistId;
        this.part = `contentDetails,id,snippet,status`;
        this.videoPart = `contentDetails,id,recordingDetails,player,liveStreamingDetails,localizations,snippet,statistics,status,topicDetails`;

        this.listPlaylistItems();


    }

    listPlaylistItems() {
        YoutubeService.listPlaylistItems(this.part, this.playlistId, this.pageToken, 10).then((res: any) => {
            this.listVideo(res["data"]["items"][0]['snippet']['resourceId']['videoId']);
            this.playListVideos = res["data"]["items"]
            this.loading = false;
            // this.embededVideo = res?.data?.items[0]?.player?.embedHtml
            // this.videoLoading = false;
        })
    }

    listVideo(videoId:string){
        YoutubeService.listVideoDetails(this.videoPart,videoId,'',1).then( (res:any) =>{
          this.videoDetails = res["data"]["items"][0];
          this.videoLoading = false;
        })
      }
}
