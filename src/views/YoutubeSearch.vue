<template>
  <p>Search Works!</p>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import YoutubeService  from '../services/YoutubeService'
@Options({
  components: {
    
  },
  provide:{
    YoutubeService
  }
})
export default class YoutubeSearch extends Vue {

 
}
</script>
