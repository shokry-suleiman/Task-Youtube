<template>
<div>
  <!-- <select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select> -->
<!-- <select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select> -->
</div>
  <div>
      <div  v-for="result in results" v-bind:key="result.id">
        <template v-if="result.id.videoId">
            <AppVideo :title="result.snippet.title" :description="result.snippet.description" :thumbnails="result.snippet.thumbnails" :videoId="result.id.videoId"/>
        </template>
         <template v-if="result.id.playlistId">
            <AppPlayList :title="result.snippet.title" :description="result.snippet.description" :thumbnails="result.snippet.thumbnails" :videoId="result.id.videoId"/>
        </template>
        <template v-if="result.id.channelId">
            <AppPlayList :title="result.snippet.title" :description="result.snippet.description" :thumbnails="result.snippet.thumbnails" :videoId="result.id.videoId"/>
        </template>
        
      </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import   YoutubeService  from '../@resources/services/YoutubeService';
import AppVideo from "../components/AppVideo.vue"
import AppPlayList from "../components/AppPlayList.vue"

@Options({
  components: {
    AppVideo,
    AppPlayList
  },
  provide:{
    YoutubeService
  }

})
export default class YoutubeSearch extends Vue {

  keySearch!:string;
  results:any=[];
  pageToken:string='';
 
  created() {
    if(this.$route.query.query){
      this.keySearch = String(this.$route.query.query);
      this.search();
    }
  }
 
  search() {
    let keySearch = this.keySearch.split(' ').join('+')
    YoutubeService.search(`snippet`,`viewCount`,keySearch,this.pageToken,5).then(res =>{
      this.results = res['data']['items'];
      console.log('res',res['data']['items'])
    })
  }


  
}
</script>
