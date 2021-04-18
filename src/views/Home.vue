<template>
  <div>
    <TheHeader />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TheHeader from "../components/TheHeader.vue";

@Options({
  components: {
    TheHeader
  }
})
export default class Home extends Vue {}
</script>
