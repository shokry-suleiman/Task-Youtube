<template>
  <div>
    <div class="frame" :v-if="videoLoading">
      <div :v-if="videoLoading">
        <div class="frame__wrapper">
          <div v-html="videoDetails?.player.embedHtml"></div>
        </div>
        <div class="">
          <div class="frame__info">
            <div class="frame__info--flex frame__info--between">
              <div class="frame__title">{{ videoDetails?.snippet.title }}</div>
              <img
                src="../../assets/images/down-arrow.svg"
                alt=""
                class="frame__down"
              />
            </div>
            <div class="frame__info--flex">
              <div class="frame__channel">
                {{ videoDetails?.snippet.channelTitle }}
              </div>
              <div class="frame__views">
                {{ videoDetails?.statistics.viewCount }} views
              </div>
            </div>

            <div class="frame__info--flex">
              <div class="frame__info--flex frame__info--box">
                <div class="frame__info--flex frame__info--max">
                  <img
                    src="../../assets/images/like.svg"
                    alt=""
                    class="frame__like--img"
                  />
                  <div class="frame__like">
                    {{ videoDetails?.statistics.likeCount }}
                  </div>
                </div>
                <div class="channel frame__info--flex">
                  <img
                    src="../../assets/images/dislike.svg"
                    alt=""
                    class="frame__dislike--img"
                  />
                  <div class="frame__dislike">
                    {{ videoDetails?.statistics.dislikeCount }}
                  </div>
                </div>
              </div>
              <div class="frame__info--flex frame__info--box frame__info--end">
                <img src="../../assets/images/plus.svg" alt="" class="frame__plus">
                <img src="../../assets/images/share.svg" alt="" class="frame__share">
                <img src="../../assets/images/flags.svg" alt="" class="frame__flags">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :v-if="!loading" class="container">
      <div v-for="video in playListVideos" v-bind:key="video.id">
        <AppVideo
          :title="video?.snippet.title"
          :description="video.snippet.description"
          :thumbnails="video.snippet.thumbnails"
          :videoId="video.snippet.resourceId.videoId"
          :channelTitle="video.snippet.channelTitle"
        />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import YoutubePlaylistDetails from "./YoutubePlaylistDetails";

export default YoutubePlaylistDetails;
</script>

<style lang="scss" >
@import "src/assets/scss/main.scss";
@import "./YoutubePlaylistDetails.scss";
</style>
