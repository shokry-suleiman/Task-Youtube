<template>
  <div>
    <TheHeader />
    <router-view :key="$router.fullPath" />
  </div>
</template>


<script lang="ts">
import Home from "./Home";

export default Home;
</script>

<style lang="scss" >
@import "src/assets/scss/_theme-colors.scss";
@import "./Home.scss";
</style>
