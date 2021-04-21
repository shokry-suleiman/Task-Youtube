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