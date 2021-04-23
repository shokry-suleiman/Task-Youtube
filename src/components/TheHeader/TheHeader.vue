<template>
  <header class="header">
    <nav class="navmob">
      <router-link :to="{ name: 'Search' }">
        <img
          src="../../assets/images/youtube.svg"
          alt=""
          class="navmob__logo"
        />
      </router-link>
      <div class="navmob__key" v-if="!isActive">{{ keySearch }}</div>
      <div class="navmob__content">
        <input
          type="text"
          class="navmob__input"
          v-if="isActive"
          name="search"
          v-on:keyup.enter="search"
          v-model="keySearch"
        />
        <img
          v-if="isActive"
          src="../../assets/images/cancel.svg"
          alt=""
          class="navmob__close"
          @click="isActive = !isActive"
        />
      </div>
      <img
        src="../../assets/images/search.svg"
        alt=""
        class="navmob__search"
        @click="search"
      />
    </nav>
    <div class="grid-container">
      <nav class="navdesk">
        <router-link :to="{ name: 'Search' }">
          <img
            src="../../assets/images/Logo-desk.svg"
            alt=""
            class="navdesk__logo"
          />
        </router-link>
        <div class="navdesk__content">
          <input
            type="text"
            class="navdesk__input"
            name="search"
            v-on:keyup.enter="search"
            v-model="keySearch"
          />
           <button class="navdesk__button" @click="search">
          <img
            src="../../assets/images/search-desktop.svg"
            alt=""
            class="navdesk__search"
            @click="search"
          />
        </button>
        </div>
       
      </nav>
    </div>
  </header>
</template>
<script lang="ts">
import TheHeader from "./TheHeader";

export default TheHeader;
</script>

<style lang="scss" >
@import "src/assets/scss/main.scss";
@import "./TheHeader.scss";
</style>
