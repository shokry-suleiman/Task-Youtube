<template>
  <p>Channel Works!</p>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useRoute } from 'vue-router'

@Options({
  components: {
    
  },
})
export default class YoutubeChannelDetails extends Vue {

  mounted(){
      const id = useRoute().params.channelId
      console.log('id',id)


  }
}
</script>
