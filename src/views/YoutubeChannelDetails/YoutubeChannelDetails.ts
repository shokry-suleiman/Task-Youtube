import { Options, Vue } from "vue-class-component";
import { useRoute } from "vue-router";
import YoutubeService from "../../@resources/services/YoutubeService";
import AppVideo from "../../components/AppVideo/AppVideo.vue";
import AppPlayList from "../../components/AppPlaylist/AppPlayList.vue";
import AppChannel from "../../components/AppChannel/AppChannel.vue";
@Options({
  components: {
    AppVideo,
    AppPlayList,
    AppChannel
  },
  provide: {
    YoutubeService
  }
})
export default class YoutubeChannelDetails extends Vue {
  channelId!: any;
  part!: string;
  channel!: any;
  playlistPageToken: string = "";
  playlistItemType = "snippet";
  loading: boolean = false;
  results: any = [];
  loadingResults: boolean = false;
  mounted() {
    this.channelId = useRoute().params.channelId;
    this.part =
      "snippet,contentDetails,brandingSettings,localizations,statistics";
    this.listChannel();
  }

  listChannel() {
    YoutubeService.listChannel(this.part, this.channelId).then((res: any) => {
      console.log("res", res);
      this.channel = res["data"]["items"][0];
      this.loading = true;
      this.listPlaylistItems();
      console.log("this.channel", this.channel);
    });
  }

  listPlaylistItems() {
    YoutubeService.listPlaylistItems(
      this.playlistItemType,
      this.channel.contentDetails.relatedPlaylists.uploads,
      this.playlistPageToken
    ).then((res: any) => {
      this.results = res["data"]["items"];
      this.loadingResults = true;
      console.log("resssss", res);
    });
  }
}