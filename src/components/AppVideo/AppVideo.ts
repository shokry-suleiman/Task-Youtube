import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    description: String,
    title: String,
    thumbnails: [],
    videoId: String,
  },
})
export default class AppVideo extends Vue {}