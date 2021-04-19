<template>
    <div>
     <label for="search">Search</label>
   <input type="text" id="search" name="search" v-on:keyup.enter="search" v-model="keySearch"><br><br>
   <button type="button" @click="search">Click Me!</button>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
      
  }
})
export default class TheHeader extends Vue {
   keySearch!:string;
    created(){
       if(this.$route.query.query){
      this.keySearch = String(this.$route.query.query);
      this.search();
    }

    
    }

     search() {
    this.$router.push({path:'/search',query:{query:this.keySearch}});
  
  }
}
</script>

<style scoped lang="sass">

</style>
