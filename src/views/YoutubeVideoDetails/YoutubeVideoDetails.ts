import { Options, Vue } from 'vue-class-component';
import { useRoute } from 'vue-router';

@Options({
  components: {
    
  },
})
export default class YoutubeVideolDetails extends Vue {
   playlistId!:any;
   mounted() {
    this.playlistId = useRoute().params.playlistId;
   
  }
}