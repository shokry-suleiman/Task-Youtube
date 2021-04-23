import { Options, Vue } from 'vue-class-component';
import { useRoute } from 'vue-router';
import YoutubeService from "../../@resources/services/YoutubeService";
import AppVideo from "../../components/AppVideo/AppVideo.vue";
@Options({
  components: {
    AppVideo
  },
  provide:{
    YoutubeService
  }
})
export default class YoutubeVideolDetails extends Vue {
   videoId!:any;
   videoPart!:string; 
   relatedVideosPart!:string;
   pageToken:string = '';
   relatedVideos!:any[];
   loading:boolean =true;
   videoLoading:boolean = true;
   videoDetails!:any;
   embededVideo!:any;
   mounted() {
    this.videoId = useRoute().params.videoId;
    this.videoPart = `contentDetails,id,recordingDetails,player,liveStreamingDetails,localizations,snippet,statistics,status,topicDetails`;
    this.relatedVideosPart =`snippet`
    this.listVideo();
    this.listRelatedVideos();

  }

  listVideo(){
    YoutubeService.listVideoDetails(this.videoPart,this.videoId,'',1).then( (res:any) =>{
      this.videoDetails = res["data"]["items"][0];
      console.log('sdfasd',this.videoDetails)
      this.embededVideo = res?.data?.items[0]?.player?.embedHtml
      this.videoLoading = false;
    })
  }

  listRelatedVideos(){
    YoutubeService.listRelatedVideos(this.relatedVideosPart,this.videoId,`video`,this.pageToken,10).then((res:any) =>{
      this.relatedVideos = res.data.items
      console.log('res',res.data.items)
      this.loading =false;
      
    })
  }

}