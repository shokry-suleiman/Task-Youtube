import { Options, Vue } from "vue-class-component";
import TheHeader from "../../components/TheHeader/TheHeader.vue";

@Options({
  components: {
    TheHeader
  }
})
export default class Home extends Vue {}
