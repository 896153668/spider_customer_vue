<template>
  <div>
    <el-card class="box-card" style="height: auto">
      <p style="font-size: 22px; margin-left: 20px; margin-top: 5px">
        基本设置
      </p>
      <el-divider></el-divider>

      <div style="margin-left: 50px">
        手机号：{{ info.phone }}
        <el-tooltip
          content="是否显示"
          placement="top"
        >
          <i class="el-icon-question" style="margin-left: 10px"></i>
        </el-tooltip>
        <el-switch
          v-model="info.phoneStatus"
          style="margin-left: 20px"
          @change="updateStatus"
        ></el-switch>
      </div>

      <div style="margin-left: 50px; margin-top: 30px">
        座机号：{{ info.phone1 }}
       <el-tooltip
          content="是否显示"
          placement="top"
        >
          <i class="el-icon-question" style="margin-left: 10px"></i>
        </el-tooltip>
        <el-switch
          v-model="info.phone1Status"
          style="margin-left: 20px"
          @change="updateStatus"
        ></el-switch>
      </div>
      <div style="margin-left: 50px; margin-top: 30px">
        邮箱：{{ info.email }}
        <el-tooltip
          content="是否显示"
          placement="top"
        >
          <i class="el-icon-question" style="margin-left: 10px"></i>
        </el-tooltip>
        <el-switch
          v-model="info.emailStatus"
          style="margin-left: 20px"
          @change="updateStatus"
        ></el-switch>
      </div>

      <!--      <p>建议您定期修改您的密码，保证您账号的安全性</p>-->
      <el-button
        type="primary"
        style="margin-left: 10%; margin-top: 30px"
        size="medium"
        @click="dialogVisible = true"
        >修改基本设置</el-button
      >
      <br />
      <br />
      <br />

      <p style="font-size: 22px; margin-left: 20px; margin-top: 5px">
        其他设置
      </p>
      <el-divider></el-divider>
    </el-card>

    <el-dialog
      title="修改基本设置"
      v-model="dialogVisible"
      style="width: 40%; margin-left: 25%"
    >
      <el-form :model="settingForm" ref="settingForm" style="width: 100%">
        <el-form-item
          label="手机号:"
          style="width: 100%; float: left"
          prop="phone"
        >
          <el-input
            placeholder="请输入"
            v-model="settingForm.phone"
            style="width: 80%; float: left; font-size: 18px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="座机号:"
          style="width: 100%; float: left"
          prop="phone1"
        >
          <el-input
            placeholder="请输入"
            v-model="settingForm.phone1"
            style="width: 80%; float: left; font-size: 18px"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="邮箱:"
          style="width: 100%; float: left"
          prop="phone1"
        >
          <el-input
            placeholder="请输入"
            v-model="settingForm.email"
            style="width: 80%; float: left; font-size: 18px"
          ></el-input>
        </el-form-item>
        <el-button
          type="primary"
          style="margin-left: 30%; margin-top: 30px"
          size="medium"
          @click="updateSetting()"
          >确认修改</el-button
        >
        <el-button size="medium" @click="dialogVisible = false"
          >取消修改</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import bus from "../assets/js/bus.js";
import request from "@/utils/request";

export default {
  name: "Setting",
  data() {
    return {
      info: {},
      settingForm: {},
      dialogVisible: false,
    };
  },
  methods: {
    updateSetting() {
      request.post("/admin/updateSetting", this.settingForm).then((res) => {
        // console.log(res.data);
        if (res.code === 1) {
          this.$message({ message: "更新成功！", type: "success" });
        } else if (res.code === -3)
          this.$message({
            message: res.message,
            type: "error",
          });
        else this.$message({ message: res.message, type: "error" });
        this.getInfo();
        this.dialogVisible = false;
      });
    },
    getInfo() {
      request.get("/admin/getInfo").then((res) => {
        console.log(res);
        // if (res.data.code === -4)
        //   setTimeout(() => {
        //     this.$router.push("/login");
        //   }, 1000);

        if (res.code === 1) {
          res = res.data;
          this.info = {
            phone: res.phone,
            phone1: res.phone1,
            email: res.email,
            phoneStatus: res.phoneStatus === "true",
            phone1Status: res.phone1Status === "true",
            emailStatus: res.emailStatus === "true",
          };
          this.settingForm = JSON.parse(JSON.stringify(this.info));
          // console.log(this.info);
          // console.log(this.settingForm);
          // bus.$emit("username", res.username);
        } else this.$message({ message: res.data.message, type: "error" });
      });
    },
    updateStatus() {
      console.log(this.info);
      request.post("/admin/updateStatus", this.info).then((res) => {
        console.log(res);
        if (res.code === 1) {
          this.$message({ message: "更新成功！", type: "success" });
        } else this.$message({ message: res.message, type: "error" });
      });
    },
  },
  mounted() {
    // this.draw()
  },
  created() {
    this.getInfo();
    // console.log("url--info",this.$route.path,location.host);
  },
};
</script>

<style scoped>
.box-card {
  float: left;
  margin-top: 20px;
  width: 600px;
  height: 580px;
  margin-left: 30px;
  min-height: 10px;
}
.box-card p {
  font-size: 17px;
  margin-top: 35px;
  margin-left: 50px;
}
</style>
