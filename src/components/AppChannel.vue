<template>
 <router-link :to="{  name: 'Channel', params: { channelId: channelId } }">
   <div>
   <picture>
      <source  v-bind:srcset="thumbnails.high.url" media="(min-width: 1200px)" />
      <source  v-bind:srcset="thumbnails.medium.url" media="(min-width: 800px)" />
      <img
        v-bind:src="thumbnails.default.url"
        alt="My amazing peace pie at the appropriate dimension!"
      />
    </picture>
    <div>
      {{ description }}
    </div>
	<div>
		{{ title }}
	</div>
  </div>
 </router-link>

</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
 props: {
    description: String,
    title: String,
    thumbnails: [],
    channelId: String,
  },
})
export default class AppChannel extends Vue {
  
}
</script>

<style scoped lang="sass">

</style>
