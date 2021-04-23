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
  },
  
  watch:{
      '$route': {
            handler: function(to: any,from:any): void {
              console.log('from',from)
              console.log('to',to)
              this.videoId = to.params.videoId;
              this.videoPart = `contentDetails,id,recordingDetails,player,liveStreamingDetails,localizations,snippet,statistics,status,topicDetails`;
              this.relatedVideosPart =`snippet`
              this.listVideo();
              this.listRelatedVideos();
            },
            immediate: true,
          },
          
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