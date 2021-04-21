<template>
  <div v-if="loading" class="channel">
    <img
      v-bind:src="channel.brandingSettings.image.bannerExternalUrl"
      alt=""
      class="channel__banner"
    />
    <div class="channel__thumbnails">
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
          class="channel__image"
          v-bind:src="channel.snippet.thumbnails.default.url"
          alt="My amazing peace pie at the appropriate dimension!"
        />
      </picture>
      <div class="channel__info">
        <div class="channel__title">
          {{ channel.brandingSettings.channel.title }}
        </div>
        <div class="channel__subscription">
          <img
            class="channel__ytb"
            src="../../assets/images/youtube-subscribe.svg"
            alt=""
          />
          Subscribe
          <span class="channel__subscription--value">{{
            channel.statistics.subscriberCount
          }}</span>
        </div>
      </div>
    </div>
    <div :v-if="loadingResults" class="container">
      <div v-for="result in results" v-bind:key="result.id">
        <AppPlayList
          :title="result.snippet.title"
          :description="result.snippet.description"
          :thumbnails="result.snippet.thumbnails"
          :playlistId="result.id"
		  :itemCount="result.contentDetails.itemCount"
        />

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import YoutubeChannelDetails from "./YoutubeChannelDetails";

export default YoutubeChannelDetails;
</script>

<style lang="scss" >
@import "src/assets/scss/main.scss";
@import "./YoutubeChannelDetails.scss";
</style>


