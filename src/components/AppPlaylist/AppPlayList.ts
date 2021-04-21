import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    description: String,
    title: String,
    thumbnails: [],
    playlistId: String,
  },
})
export default class AppPlayList extends Vue {}