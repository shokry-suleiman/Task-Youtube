import { Options, Vue } from "vue-class-component";

@Options({
  props: {}
})
export default class TheHeader extends Vue {
  keySearch!: string;
  isActive:boolean = false;
  created() {
    if (this.$route.query.query) {
    
      this.keySearch = String(this.$route.query.query);
      this.$router.push({ path: "/search", query: { query: this.keySearch } });
      
    }
  }

  search() {
    if(!this.isActive) this.isActive =true;
    
    this.$router.push({ path: "/search", query: { query: this.keySearch } });
  }
}