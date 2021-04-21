import { Options, Vue } from "vue-class-component";
import YoutubeService from "../../@resources/services/YoutubeService";
import AppVideo from "../../components/AppVideo/AppVideo.vue";
import AppPlayList from "../../components/AppPlaylist/AppPlayList";
import AppChannel from "../../components/AppChannel/AppChannel.vue"

@Options({
  components: {
    AppVideo,
    AppPlayList,
    AppChannel
  },
  provide: {
    YoutubeService,
  },
  watch:{
      '$route': {
            handler: function(to: any): void {
              // Do something here.
              console.log('sheks working now googd')
              console.log(to)
            },
            immediate: true,
          },
          
  }
})
export default class YoutubeSearch extends Vue {
  keySearch!: string;
  results: any = [];
  pageToken: string = "";
  type: string = "";
  time: any = new Date(0).toISOString();
  order:string = 'relevance';
  filterPreview = {
      type:null,
      uploadDate:null,
      sort: null
  }
  readonly itemsPerPage = 5;
  
  created() {
    if (this.$route.query.query) {
      this.keySearch = String(this.$route.query.query);
      this.search();
    }
  }

  search() {
      console.log('clicked')
    this.getResults();
  }

  updated(){
    console.log('refoooo')
  }

  onUploadDateChange(val: string) {
      console.log('here')
    switch (val) {
      case "today":
        this.time = new Date().toISOString();
        break;
      case "week":
        this.time = this.getWeek();
        break;
      case "month":
        this.time = this.getMonth();
        break;
      default:
        this.time = new Date(0).toISOString();
    }
     console.log('here,eswer')
    this.getResults();
  }

  onTypeChange(event: any) {
    this.type = event.target.value;
    this.getResults();
  }

  getResults() {
    YoutubeService.search(
      `snippet`,
      this.order,
      this.keySearchValue(),
      this.pageToken,
      this.type,
      this.time,
      this.itemsPerPage
    ).then((res:any) => {
      this.results = res["data"]["items"];
      // this.pageToken = res["data"]["nextPageToken"]; 
    });
  }

  keySearchValue() {
    return this.keySearch.split(" ").join("+");
  }

  getWeek() {
    let day = new Date().getDay();
    let diff = new Date().getDate() - day + (day == 0 ? -6 : 1);
    console.log('new Date(new Date().setDate(diff))',new Date(new Date().setDate(diff)))
    console.log('new Date(new Date().setDate(diff))',new Date(new Date().setDate(diff)).toISOString())
    return new Date(new Date().setDate(diff)).toISOString();
  }

  getMonth() {
    let date = new Date();
    console.log('new Date(date.getFullYear(), date.getMonth(), 1)',new Date(date.getFullYear(), date.getMonth(), 1))
        console.log('new Date(date.getFullYear(), date.getMonth(), 1)',new Date(date.getFullYear(), date.getMonth(), 1).toISOString())

    return new Date(date.getFullYear(), date.getMonth(), 2).toISOString();
  }

  loadMoreData(){
      
  }

  uploadDateFilter(val:string){
      
  }

  typeFilter(val:string){
      this.type = val;
      this.getResults();
  }

  sortby(val:string){
      this.order = val;
      this.getResults();
  }
}