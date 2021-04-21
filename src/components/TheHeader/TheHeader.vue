<template>
  <header class="header">
    <nav class="nav">
      <img src="../../assets/images/youtube.svg" alt="" class="nav__logo" />
      <div class="nav__key" v-if="!isActive">{{keySearch}} {{isActive}}</div>
      <input
        type="text"
        class="nav__input"
         v-if="isActive"
        name="search"
        v-on:keyup.enter="search"
        v-model="keySearch"
      /><br /><br />
      <img src="../../assets/images/search.svg" alt="" class="nav__search" @click="search">
    </nav>
  </header>
</template>
<script lang="ts">
import TheHeader from './TheHeader';

    export default TheHeader;
</script>

<style lang="scss" >
@import "src/assets/scss/_theme-colors.scss";
  @import "./TheHeader.scss";
</style>
