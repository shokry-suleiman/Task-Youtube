<template>
 <router-link :to="{ name: 'Playlist', params: { playlistId: playlistId } }">
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
      <div class="item__overlay">
        <div class="item__count">{{ itemCount}}</div>
        <img class="item__playlist" src="../../assets/images/playlist.svg" alt="">
      </div>
      </div>
      <div class="item__info">
        <div class="item__title">
          {{ title }}
      </div>
      </div>
      
    </div>
  </router-link>
</template>
<script lang="ts">
import AppPlayList from './AppPlayList';

    export default AppPlayList;
</script>

<style lang="scss" >
@import "src/assets/scss/main.scss";
  @import "./AppPlayList.scss";
</style>
