<template>
  <div class="">
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
      <div class="deskfilter grid-container">
		  <div class="deskfilter__header">
			  <div class="deskfilter__result">
				  About  {{ totalResult || null }} results
			  </div>
			  <div class="deskfilter__filter" @click="filterPreview.status = !filterPreview.status">
				  <img src="../../assets/images/filter.svg" alt="" class="deskfilter__filter--img" >
				  <div class="deskfilter__filter--text">
            Filter
				  </div>
			  </div>
		  </div>
       <div class="deskfilter__content" v-if="filterPreview.status">
         <div class="deskfilter__values">
            <div class="deskfilter__title">Upload date</div>
            <hr class="deskfilter__sperator">
            <div @click="onUploadDateChange('today')" class="deskfilter__value">
              <span>Today</span>
              <img src="../../assets/images/cancel-dark.svg"  class="deskfilter__value--active" v-if="filterPreview.uploadDate == 'today'">
            </div>
            <div @click="onUploadDateChange('week')" class="deskfilter__value">
              <span>This week</span>
              <img src="../../assets/images/cancel-dark.svg"  class="deskfilter__value--active" v-if="filterPreview.uploadDate == 'week'">
            </div>
            <div @click="onUploadDateChange('month')" class="deskfilter__value">
              <span>This Month</span>
              <img src="../../assets/images/cancel-dark.svg"  class="deskfilter__value--active" v-if="filterPreview.uploadDate == 'month'">
            </div>
          </div>
          <div  class="deskfilter__values">
            <div class="deskfilter__title">Type</div>
            <hr class="deskfilter__sperator">
            <div @click="typeFilter('video')" class="deskfilter__value">
              <span>Video</span>
               <img src="../../assets/images/cancel-dark.svg"  class="deskfilter__value--active" v-if="filterPreview.type == 'video'">
              </div>
            <div @click="typeFilter('channel')" class="deskfilter__value">
              <span>Channel</span>
              <img src="../../assets/images/cancel-dark.svg"  class="deskfilter__value--active" v-if="filterPreview.type == 'channel'">
            </div>
            <div @click="typeFilter('playlist')" class="deskfilter__value">
              Playlist
              <img src="../../assets/images/cancel-dark.svg"  class="deskfilter__value--active"  v-if="filterPreview.type == 'playlist'">
            </div>
          </div>
          
          <div  class="deskfilter__values">
            <div class="deskfilter__title">Sort by</div>
            <hr class="deskfilter__sperator">
            <div @click="sortby('relevance')" class="deskfilter__value">
              <span>Relevance</span>
              <img src="../../assets/images/cancel-dark.svg"  class="deskfilter__value--active" v-if="filterPreview.sort == 'relevance'">
            </div>
            <div @click="sortby('date')" class="deskfilter__value">
              <span> Upload Date</span>
              <img src="../../assets/images/cancel-dark.svg"  class="deskfilter__value--active" v-if="filterPreview.sort == 'date'">
            </div>
            <div @click="sortby('viewCount')" class="deskfilter__value">
              <span>View Count</span>
              <img src="../../assets/images/cancel-dark.svg"  class="deskfilter__value--active" v-if="filterPreview.sort == 'viewCount'">
            </div>
            <div @click="sortby('rating')" class="deskfilter__value">
              <span>Rating</span>
              <img src="../../assets/images/cancel-dark.svg"  class="deskfilter__value--active" v-if="filterPreview.sort == 'rating'">

              </div>
          </div>
        </div>
        <hr>
      </div>
	  
      <div class="grid-container">
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
      <div class="loadmore" v-if="!loadMore">
        <div class="loadmore__text" @click="loadMoreData">Show more items</div>
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

