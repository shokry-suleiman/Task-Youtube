<template>
  <header class="header">
    <nav class="nav">
       <router-link :to="{ name: 'Search'}">
          <img src="../../assets/images/youtube.svg" alt="" class="nav__logo" />
       </router-link>
      <div class="nav__key" v-if="!isActive">{{keySearch}}</div>
      <div class="nav__content">
        <input
        type="text"
        class="nav__input"
         v-if="isActive"
        name="search"
        v-on:keyup.enter="search"
        v-model="keySearch"/>
        <img v-if="isActive" src="../../assets/images/cancel.svg" alt="" class="nav__close" @click="isActive=!isActive">
      </div>
       
      <img src="../../assets/images/search.svg" alt="" class="nav__search" @click="search">
    </nav>
  </header>
</template>
<script lang="ts">
import TheHeader from './TheHeader';

    export default TheHeader;
</script>

<style lang="scss" >
@import "src/assets/scss/main.scss";
  @import "./TheHeader.scss";
</style>
