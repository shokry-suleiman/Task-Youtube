import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    description: String,
    title: String,
    thumbnails: [],
    playlistId: String,
    itemCount: String,
    channelTitle: String
  },
})
export default class AppPlayList extends Vue {}