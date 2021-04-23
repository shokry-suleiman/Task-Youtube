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
              this.keySearch = String(this.$route.query.query);
              this.pageToken ="";
              this.filterPreview = {
                status: false,
                type:null,
                uploadDate:null,
                sort: null
            }
              this.search();
            },
            immediate: true,
          },
          
  },
  
})
export default class YoutubeSearch extends Vue {
  keySearch!: string;
  results: any = [];
  pageToken: string = "";
  type: string = "";
  time: any = new Date(0).toISOString();
  order:string = 'relevance';
  filterPreview = {
      status: false,
      type:'',
      uploadDate:'',
      sort: ''
  }
  readonly itemsPerPage = 5;
  loading:boolean = true;
  loadMore:boolean =false;
  totalResult:any;
  search() {
      console.log('clicked')
      this.loading = true;
    this.getResults();
  }
  
  updated(){
    console.log('refoooo')
  }

  onUploadDateChange(val: string) {
    if(this.filterPreview.uploadDate ==val) {
      this.filterPreview.uploadDate = '';
      this.time = new Date().toISOString();
      this.getResults();
      return;
    }
      this.filterPreview.uploadDate = val;
      this.filterPreview.status = false;
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
      
      if (this.loadMore) {
        this.results = [...this.results,...res["data"]["items"]];
        this.loadMore = false;
      }else {
        this.results = res["data"]["items"];
      this.loading=false;
      this.totalResult = res["data"]["pageInfo"]["totalResults"]
      }
      this.totalResult = res["pageInfo"]["totalResults"]  
      this.pageToken = res["data"]["nextPageToken"]; 
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
    this.loadMore =true;
      this.getResults();
  }

  uploadDateFilter(val:string){
      
  }

  typeFilter(val:string){
      if(this.filterPreview.type ==val) {
        this.filterPreview.type = '';
        this.type= '';
        this.getResults();
        return;
      }
      this.type = val;
      this.filterPreview.type = val;
      this.filterPreview.status = false;
      this.getResults();
  }

  sortby(val:string){
    if(this.filterPreview.sort ==val) {
      this.order = '';
      this.filterPreview.sort = '';
      this.getResults();
      return;
    }
      this.order = val;
      this.filterPreview.sort = val;
      this.filterPreview.status = false;
      this.getResults();
  }
}