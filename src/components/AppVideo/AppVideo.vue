<template>
<router-link :to="{ name: 'Video', params: { videoId: videoId } }">

  <div class="item">
      <div class="item__thumbnails">
        <picture>
          <source
            v-bind:srcset="thumbnails.high.url"
            media="(min-width: 1200px)"
          />
        <source
          v-bind:srcset="thumbnails.medium.url"
          media="(min-width: 800px)"
        />
        <img
          v-bind:src="thumbnails.default.url"
          class="item__image"
          alt="My amazing peace pie at the appropriate dimension!"
        />
      </picture>
      </div>
      <div class="item__info">
        <div class="item__title">
          {{ title }}
      </div>
      <div class="item__channel">
        {{ channelTitle }}
      </div>
      <div class="item__views">
          views
      </div>
      </div>
    </div>

</router-link>

</template>
<script lang="ts">
import AppVideo from './AppVideo';

    export default AppVideo;
</script>

<style scoped lang="scss" >
@import "src/assets/scss/main.scss";
  @import "./AppVideo.scss";
</style>
