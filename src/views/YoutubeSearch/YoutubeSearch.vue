<template>
  <div>
    <div class="" v-if="!loading">
      <div class="mobfilter">
        <div class="mobfilter__content">
          <select @change="onTypeChange($event)" class="mobfilter__select">
            <option selected value="">All</option>
            <option value="video">Video</option>
            <option value="channel">Channel</option>
            <option value="playlist">Playlist</option>
          </select>
          <img
            src="../../assets/images/down-arrow.svg"
            class="mobfilter__arrow"
            alt=""
          />
        </div>
        <div class="mobfilter__content">
          <select
            @change="onUploadDateChange($event.target.value)"
            class="mobfilter__select"
          >
            <option selected value="">Any time</option>
            <option value="today">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
          </select>
          <img
            src="../../assets/images/down-arrow.svg"
            class="mobfilter__arrow"
            alt=""
          />
        </div>
      </div>
      <div class="desktop-filter">
        <div class="filters">
          <div>
            <div>Type</div>
            <div @click="typeFilter('video')" class="cursor-pionter">Video</div>
            <div @click="typeFilter('channel')" class="cursor-pionter">
              Channel
            </div>
            <div @click="typeFilter('playlist')" class="cursor-pionter">
              Playlist
            </div>
          </div>
          <div>
            <div>Upload date</div>
            <div @click="onUploadDateChange('today')" class="cursor-pionter">
              Today
            </div>
            <div @click="onUploadDateChange('week')" class="cursor-pionter">
              This week
            </div>
            <div @click="onUploadDateChange('month')" class="cursor-pionter">
              This Month
            </div>
          </div>
          <div>
            <div>Sort by</div>
            <div @click="sortby('relevance')" class="cursor-pionter">
              Relevance
            </div>
            <div @click="sortby('date')" class="cursor-pionter">
              Upload Date
            </div>
            <div @click="sortby('viewCount')" class="cursor-pionter">
              View Count
            </div>
            <div @click="sortby('rating')" class="cursor-pionter">Rating</div>
          </div>
        </div>
      </div>
      <div class="container">
        <div v-for="result in results" v-bind:key="result.id">
          <template v-if="result.id.videoId">
            <AppVideo
              :title="result.snippet.title"
              :description="result.snippet.description"
              :thumbnails="result.snippet.thumbnails"
              :videoId="result.id.videoId"
              :channelTitle="result.snippet.channelTitle"
            />
          </template>
          <template v-if="result.id.playlistId">
            <AppPlayList
              :title="result.snippet.title"
              :description="result.snippet.description"
              :thumbnails="result.snippet.thumbnails"
              :playlistId="result.id.playlistId"
              :channelTitle="result.snippet.channelTitle"
            />
          </template>
          <template v-if="result.id.channelId">
            <AppChannel
              :title="result.snippet.title"
              :description="result.snippet.description"
              :thumbnails="result.snippet.thumbnails"
              :channelId="result.id.channelId"
            />
          </template>
        </div>
      </div>
      <div class="loadmore" v-if="!loadMore">
       <div class="loadmore__text"  @click="loadMoreData"> Show more items</div>
	   
      </div>
	   <div class="loadmore" v-if="loadMore">
		   <img
        src="../../assets/images/beautiful_loader.gif"
        alt=""
        class="loadmore__spinner"
      />
	   </div>
	  
    </div>
    <div class="spinner" v-if="loading">
      <img
        src="../../assets/images/beautiful_loader.gif"
        alt=""
        class="spinner__image"
      />
      <div class="spinner__loading">loading</div>
    </div>
  </div>
</template>

<script lang="ts">
import YoutubeSearch from "./YoutubeSearch";

export default YoutubeSearch;
</script>

<style lang="scss" scoped >
@import "src/assets/scss/main.scss";
@import "./YoutubeSearch.scss";
</style>

