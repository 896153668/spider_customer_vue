<template>
  <div class="head">
    <!-- <div class="hiddenLeft-btn" @click="collapseChange">
      <i class="el-icon-menu" style="min-width: 100px"></i>
    </div> -->

    <div class="logo">商家后台</div>

    <!--头像-->
   
    <div class="dropdown">
       <img class="avatear" src="../assets/imgs/user.jpg" />
      <el-dropdown @command="handleCommand" size="medium" >
        <span class="el-dropdown-link">
          {{ username }}<i class="el-icon-arrow-down el-icon--right" ></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item command="info">个人信息</el-dropdown-item> -->
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    
  </div>
</template>

<script>
// import bus from "../assets/js/bus";

import request from "@/utils/request";

export default {
  name: "TheHeader",
  data() {
    return {
      username: "visitor",
      // collapse: true,
    };
  },
  methods: {
    // // 隐藏侧边栏
    // collapseChange() {
    //   this.collapse = !this.collapse;
    //   bus.$emit("collapse", this.collapse);
    // },
    // 用户中心下拉菜单
    handleCommand(command) {
      if (command === "logout") {
        this.logout();
      }
    },
    // 退出
    logout() {
      request.get("/user/logout").then((res) => {
        // console.log(res.data)
        if (res.data.code === 1) {
          this.$message({ message: res.data.message, type: "success" });
          setTimeout(function () {
            window.location = "/#/login";
          }, 1000);
        } else this.$message({ message: res.data.message, type: "error" });
      });
    },
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        console.log("获取cookie,现在循环")
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          console.log(c)
          while (c.charAt(0) == ' ') c = c.substring(1);
          if (c.indexOf(name) != -1){
            return c.substring(name.length, c.length);
          }
        }
        return "";
      },
  },
  created() {
    // bus.$on('username',msg=>{
    //   this.username = msg
    // })
    
    // console.log(this.getCookie("userId"));
    //  console.log(6666);
  }
};
</script>

<style scoped>
.head {
  width: 100%;
  height: 70px;
  background-color: #475053;
  position: relative;
  top: 0;
  left: 0;
}
.hiddenLeft-btn {
  /*background-color: #2c3e50;*/
  float: left;
  width: 20px;
  margin-top: 27px;
  margin-left: 25px;
  /*cursor: pointer;*/
}

.logo {
  /*background-color: cornflowerblue;*/
  height: 100%;
  width: 150px;
  float: left;
  text-align: center;
  font-size: 20px;
  color: white;
  font-weight: bold;
  line-height: 70px;
}

.el-dropdown-link {
  cursor: pointer;
  color: white;
  font-size: 20px;
  line-height: 80px;
}
.el-icon-arrow-down {
  font-size: 30px;
}

.avatear {
  float: left;
  height: 45px;
  border-radius: 100px;
  margin-top: 15px;
  margin-right: 20px;
}

.dropdown {
  /* position: absolute; */
  float: right;
  /*background-color: cornflowerblue;*/
  /* /* margin-top: 25px; */
  margin-right: 30px;
}
</style>
