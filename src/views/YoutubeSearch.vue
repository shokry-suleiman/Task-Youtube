<template>
 <div>
    <div class="mob-filter">
    <select @change="onTypeChange($event)">
      <option selected value="">All</option>
      <option value="video">Video</option>
      <option value="channel">Channel</option>
      <option value="playlist">Playlist</option>
    </select>
    <select @change="onUploadDateChange($event.target.value)">
      <option selected value="">Any time</option>
      <option value="today">Today</option>
      <option value="week">This week</option>
      <option value="month">This month</option>
    </select>
  </div>
  <div class="desktop-filter">
      <div class="filters">
          <div>
              <div>Type</div>
              <div @click="typeFilter('video')" class="cursor-pionter">Video</div>
              <div @click="typeFilter('channel')" class="cursor-pionter">Channel</div>
              <div @click="typeFilter('playlist')" class="cursor-pionter">Playlist</div>
          </div>
          <div>
              <div>Upload date</div>
               <div @click="onUploadDateChange('today')" class="cursor-pionter">Today</div>
              <div @click="onUploadDateChange('week')" class="cursor-pionter">This week</div>
              <div @click="onUploadDateChange('month')" class="cursor-pionter">This Month</div>
          </div>
          <div>
              <div>Sort by</div>
              <div @click="sortby('relevance')" class="cursor-pionter" >Relevance</div>
              <div @click="sortby('date')" class="cursor-pionter" >Upload Date</div>
              <div @click="sortby('viewCount')" class="cursor-pionter">View Count</div>
              <div @click="sortby('rating')" class="cursor-pionter">Rating</div>
              
          </div>
      </div>
  </div>
  <div>
    <div v-for="result in results" v-bind:key="result.id">
      <template v-if="result.id.videoId">
        <AppVideo
          :title="result.snippet.title"
          :description="result.snippet.description"
          :thumbnails="result.snippet.thumbnails"
          :videoId="result.id.videoId"
        />
      </template>
      <template v-if="result.id.playlistId">
        <AppPlayList
          :title="result.snippet.title"
          :description="result.snippet.description"
          :thumbnails="result.snippet.thumbnails"
          :videoId="result.id.videoId"
        />
      </template>
      <template v-if="result.id.channelId">
        <AppChannel
          :title="result.snippet.title"
          :description="result.snippet.description"
          :thumbnails="result.snippet.thumbnails"
          :channelId="result.id.channelId"
        />
      </template>
    </div>
  </div>
  <div class="show-more" @click="loadMoreData">
      Show more items 
  </div>
 </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import YoutubeService from "../@resources/services/YoutubeService";
import AppVideo from "../components/AppVideo.vue";
import AppPlayList from "../components/AppPlayList.vue";
import AppChannel from "../components/AppChannel.vue"

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
</script>

<style scoped lang="scss">
   .show-more {

	    text-align: center;
        padding: 10px 0;
        border-top: 1px solid red;
   }
    .mob-filter{
            display: none;
        }
        .desktop-filter {
            display: block;
        }
    @media (max-width: 767.98px) { 
        .mob-filter{
            display: block;
        }
         .desktop-filter {
            display: none;
        }
    }
    .filters {
        display: flex;
        justify-content: space-between;
    }
    
    .cursor-pionter {
        cursor: pointer;
        line-height: 2.2rem;
    }
</style>
