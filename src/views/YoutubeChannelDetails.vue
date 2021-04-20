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
import { Options, Vue } from "vue-class-component";
import { useRoute } from "vue-router";
import YoutubeService from "../@resources/services/YoutubeService";
import AppVideo from "../components/AppVideo.vue";
import AppPlayList from "../components/AppPlayList.vue";
import AppChannel from "../components/AppChannel.vue";
@Options({
  components: {
    AppVideo,
    AppPlayList,
    AppChannel
  },
  provide: {
    YoutubeService
  }
})
export default class YoutubeChannelDetails extends Vue {
  channelId!: any;
  part!: string;
  channel!: any;
  playlistPageToken: string = "";
  playlistItemType = "snippet";
  loading: boolean = false;
  results: any = [];
  loadingResults: boolean = false;
  mounted() {
    this.channelId = useRoute().params.channelId;
    this.part =
      "snippet,contentDetails,brandingSettings,localizations,snippet,statistics";
    this.listChannel();
  }

  listChannel() {
    YoutubeService.listChannel(this.part, this.channelId).then((res: any) => {
      console.log("res", res);
      this.channel = res["data"]["items"][0];
      this.loading = true;
      this.listPlaylistItems();
      console.log("this.channel", this.channel);
    });
  }

  listPlaylistItems() {
    YoutubeService.listPlaylistItems(
      this.playlistItemType,
      this.channel.contentDetails.relatedPlaylists.uploads,
      this.playlistPageToken
    ).then((res: any) => {
      this.results = res["data"]["items"];
      this.loadingResults = true;
      console.log("resssss", res);
    });
  }
}
</script>
