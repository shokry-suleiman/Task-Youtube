<template>
    <router-view :key="$router.fullPath" />
</template>


<script lang="ts">
import YoutubeVideo from "./YoutubeVideo";

export default YoutubeVideo;
</script>

<style lang="scss" >
@import "src/assets/scss/main.scss";
@import "./YoutubeVideo.scss";
</style>
