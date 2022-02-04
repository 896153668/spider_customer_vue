<template>
  <div>
    
    <TheHeader></TheHeader>
    <TheAside></TheAside>
    <div class="content-box" >
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import TheAside from "@/components/TheAside";
import TheHeader from "@/components/TheHeader";
// import bus from "../assets/js/bus";

export default {
  name: "Layout",
  components:{
    TheAside,
    TheHeader,
  },
  data(){
    return{
      // collapse:false
    }
  },
  // created() {
  //   bus.$on('collapse',msg=>{
  //     this.collapse = msg
  //   })
  // }
}
</script>

<style scoped>
.content-box{
  /*background-color: cornflowerblue;*/
  position: absolute;
  top: 70px;
  float: left;
  left: 125px;
  width: 95%;

}

/* .content-collapse{
  left: 64px;
  width: 95%;
} */
</style>
