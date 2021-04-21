<template>
  <div v-if="loading">
    <img v-bind:src="channel.brandingSettings.image.bannerExternalUrl" alt="" />
    <picture>
      <source
        v-bind:srcset="channel.snippet.thumbnails.high.url"
        media="(min-width: 1200px)"
      />
      <source
        v-bind:srcset="channel.snippet.thumbnails.medium.url"
        media="(min-width: 800px)"
      />
      <img
        v-bind:src="channel.snippet.thumbnails.default.url"
        alt="My amazing peace pie at the appropriate dimension!"
      />
    </picture>
    <p>{{ channel.brandingSettings.channel.title }}</p>
    <div>Subscription{{ channel.statistics.subscriberCount }}</div>
    <div :v-if="loadingResults">
      <div v-for="result in results" v-bind:key="result.id">
        <template v-if="result.snippet.resourceId.videoId">
          <AppVideo
            :title="result.snippet.title"
            :description="result.snippet.description"
            :thumbnails="result.snippet.thumbnails"
            :videoId="result.snippet.resourceId.videoId"
          />
        </template>
        <template v-if="result.snippet.resourceId.playlistId">
          <AppPlayList
            :title="result.snippet.title"
            :description="result.snippet.description"
            :thumbnails="result.snippet.thumbnails"
            :videoId="result.snippet.resourceId.playlistId"
          />
        </template>
        <template v-if="result.snippet.resourceId.channelId">
          <AppChannel
            :title="result.snippet.title"
            :description="result.snippet.description"
            :thumbnails="result.snippet.thumbnails"
            :channelId="result.snippet.resourceId.channelId"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import YoutubeChannelDetails from "./YoutubeChannelDetails";

export default YoutubeChannelDetails;
</script>

<style lang="scss" >
@import "src/assets/scss/_theme-colors.scss";
@import "./YoutubeChannelDetails.scss";
</style>


