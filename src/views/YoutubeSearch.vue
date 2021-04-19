<template>
  <div>
    <select @change="onTypeChange($event)">
      <option selected value="">All</option>
      <option value="channel">Channel</option>
      <option value="playlist">Playlist</option>
    </select>
    <select @change="onUploadDateChange($event)">
      <option selected value="">Any time</option>
      <option value="today">Today</option>
      <option value="week">This week</option>
      <option value="month">This month</option>
    </select>
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
        <AppPlayList
          :title="result.snippet.title"
          :description="result.snippet.description"
          :thumbnails="result.snippet.thumbnails"
          :videoId="result.id.videoId"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import YoutubeService from "../@resources/services/YoutubeService";
import AppVideo from "../components/AppVideo.vue";
import AppPlayList from "../components/AppPlayList.vue";

@Options({
  components: {
    AppVideo,
    AppPlayList,
  },
  provide: {
    YoutubeService,
  },
})
export default class YoutubeSearch extends Vue {
  keySearch!: string;
  results: any = [];
  pageToken: string = "";
  type: string = "";
  time: any = new Date(0).toISOString();
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

  onUploadDateChange(event: any) {
      console.log('here')
    switch (event.target.value) {
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
      this.keySearchValue(),
      this.pageToken,
      this.type,
      this.time,
      this.itemsPerPage
    ).then((res) => {
      this.results = res["data"]["items"];
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
}
</script>
