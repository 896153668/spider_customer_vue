<template>
  <div class="left">
    <!-- <el-radio-group v-model="isCollapse">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu
      :collapse-transition="false"
      :collapse="isCollapse"
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      router
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="home">
        <i class="el-icon-menu"></i>
        <template #title>首页</template>
      </el-menu-item>
      <el-menu-item index="appointment">
        <i class="el-icon-document-copy"></i>

        <template #title>预约详情</template>
      </el-menu-item>
      <el-menu-item index="paymethod">
        <i class="el-icon-document-copy"></i>

        <template #title>付款方式</template>
      </el-menu-item>
      <!-- <el-menu-item index="info">
        <i class="el-icon-document"></i>
        <template #title>个人资料</template>
      </el-menu-item> -->
      <el-menu-item index="setting">
        <i class="el-icon-setting"></i>
        <template #title>设置</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
// import bus from "../assets/js/bus";

export default {
  name: "TheAside",
  data() {
    return {
      defaultActive:"Home",
      isCollapse: false,
    };
  },
  methods: {
    // handleSelect(key, keyPath) {
    //   this.$router.push("/" + keyPath);
    //   console.log(key, keyPath);
    //   console.log(key);
    //   console.log(keyPath);
    // },
  },
  created() {
    // bus.$on('collapse',msg=>{
    //   this.isCollapse = msg
    // })
    // // this.handleSelect(key, keyPath)
    console.log(this.$route.path)
    this.defaultActive=this.$route.path;
  }
};
</script>

<style scoped>
.left {
  width: auto;
  float: left;
  height: 100vh;
  /* position: fixed; */
  left: 0;
  top: 70px;
  bottom: 0;
  background-color: #545c64;
  overflow-y: hidden;
}

.left > ul {
  height: 100%;
}
</style>
