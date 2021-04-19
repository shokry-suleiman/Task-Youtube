<template>
  <label for="search">Search</label>
   <input type="text" id="search" name="search" v-on:keyup.enter="search" v-model="keySearch"><br><br>
   <button type="button" @click="search">Click Me!</button>

  <div>
      <div  v-for="result in results" v-bind:key="result.id">
        
      </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import   YoutubeService  from '../@resources/services/YoutubeService'

@Options({
  components: {
    
  },
  provide:{
    YoutubeService
  }

})
export default class YoutubeSearch extends Vue {

  keySearch!:string;
  results:any=[];
  pageToken:string='';
  
  search() {
    console.log('e',this.keySearch)
    let keySearch = this.keySearch.split(' ').join('+')
    YoutubeService.search(`snippet`,`viewCount`,keySearch,this.pageToken,5).then(res =>{
      this.results = res['data']['items'];
      console.log('res',res['data']['items'])
    })
  }
 
}
</script>
