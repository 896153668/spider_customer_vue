<template>
  <div class="main">
    <el-card class="box-card">
      <p style="font-size: 22px; margin-left: 20px; margin-top: 5px">
        基本资料
      </p>
      <el-divider></el-divider>
      <p>ID：{{ userInfo.userId }}</p>
      <p>用户名：{{ userInfo.username }}</p>
      <p>邮箱：{{ userInfo.email }}</p>
      <p>总充值：{{ userInfo.rechargeAll }}</p>
      <p>余额：{{ userInfo.money }}</p>
      <p>注册时间：{{ userInfo.regTime }}</p>
      <el-button
        type="primary"
        style="margin-left: 10%; margin-top: 30px"
        size="medium"
        @click="readyUpdate"
        >修改资料</el-button
      >
    </el-card>

    <el-card class="box-card" style="height: auto">
      <p style="font-size: 22px; margin-left: 20px; margin-top: 5px">
        修改密码
      </p>
      <el-divider></el-divider>
      <p>建议您定期修改您的密码，保证您账号的安全性</p>
      <el-button
        type="primary"
        style="margin-left: 10%; margin-top: 30px"
        size="medium"
        @click="
          pwdDialogVisible = true;
          updateForm = {};
        "
        >开始修改</el-button
      >
    </el-card>

    <el-dialog
      title="修改资料"
      v-model="dialogVisible"
      style="width: 50%; margin-left: 25%"
    >
      <el-form
        :model="updateForm"
        label-width="120px"
        class="userInfo"
        style="width: 80%"
        :rules="rules"
        status-icon="true"
        ref="updateForm"
      >
        <el-form-item
          label="ID:"
          style="width: 100%; float: left; width: 80%"
          v-if="false"
        >
          <el-input
            placeholder="请输入内容"
            v-model="updateForm.userId"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="用户名:"
          prop="username"
          style="width: 100%; float: left; width: 80%"
        >
          <el-input
            placeholder="请输入内容"
            v-model="updateForm.username"
          ></el-input>
          <p style="font-size: 10px; color: #d25e6f">
            修改后下次需要用新用户名登录
          </p>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱:"
          style="width: 100%; float: left; width: 80%"
        >
          <el-input
            placeholder="请输入内容"
            v-model="updateForm.email"
          ></el-input>
        </el-form-item>

        <el-button
          type="primary"
          style="margin-left: 25%; margin-top: 30px"
          size="medium"
          @click="updateInfo('updateForm')"
          >确认修改</el-button
        >
        <el-button size="medium" @click="dialogVisible = false">取消</el-button>
      </el-form>
    </el-dialog>

    <el-dialog
      title="修改密码"
      v-model="pwdDialogVisible"
      style="width: 50%; margin-left: 25%"
    >
      <el-form
        :model="updateForm"
        :rules="rules1"
        label-width="120px"
        class="userInfo"
        style="width: 90%"
        ref="updatePwdForm"
        status-icon="true"
      >
        <el-form-item
          label="新密码:"
          style="width: 100%; float: left; width: 80%"
          prop="password"
        >
          <el-input
            placeholder="请输入新密码"
            v-model="updateForm.password"
          ></el-input>
        </el-form-item>

        <el-button
          type="primary"
          style="margin-left: 22%; margin-top: 30px"
          size="medium"
          @click="updatePwd('updatePwdForm')"
          >确认修改</el-button
        >
        <el-button size="medium" @click="pwdDialogVisible = false"
          >取消</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import bus from "../assets/js/bus";
import request from "@/utils/request";

export default {
  name: "Info",
  data() {
    return {
      rules: {
        username: {
          required: true,
          message: "请输入用户名",
          trigger: "change",
        },
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "change",
            type: "email",
          },
        ],
      },
      rules1: {
        password: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "change",
          },
          {
            min: 6,
            message: "新密码最少6位",
            trigger: "change",
          },
        ],
      },
      userInfo: {},
      updateForm: {},
      gridData: [],
      dialogVisible: false,
      pwdDialogVisible: false,
    };
  },
  methods: {
    // 修改资料
    updateInfo(formName) {
      // let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request.post("/user/updateInfo", this.updateForm).then((res) => {
            if (res.code === 1) {
              this.$message({ message: "修改成功！", type: "success" });
              this.dialogVisible = false;
            } else {
              this.$message.error({
                message: "修改失败,请重试！",
                type: "success",
              });
            }
            this.getInfo();
          });

          console.log(this.updateForm);
        } else {
          return false;
        }
      });
    },
    // 打开修改资料前的数据准备
    readyUpdate() {
      this.updateForm = {};
      this.updateForm.userId = this.userInfo.userId;
      this.updateForm.username = this.userInfo.username;
      this.updateForm.email = this.userInfo.email;
      this.dialogVisible = true;
    },
    // 修改密码
    updatePwd(formName) {
      // let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateForm.userId = this.userInfo.userId;
          // this.updateForm.username = this.userInfo.username;
          request.post("/user/updatePwd", this.updateForm).then((res) => {
            if (res.code === 1)
              this.$message({ message: "修改成功！", type: "success" });
            else
              this.$message.error({
                message: "修改失败,请重试！",
                // type: "success",
              });
            this.getInfo();
          });
          this.pwdDialogVisible = false;
        }
      });
    },
    // 查询个人资料
    getInfo() {
      // let _this = this
      request.get("/user/getInfo").then((res) => {
        console.log(res);
        if (res.code === 1) {
          res = res.data;
          this.userInfo = {
            userId: res.userId,
            username: res.username,
            email: res.email,
            rechargeAll: res.rechargeAll,
            money: res.money,
            regTime: res.regTime,
          };
          console.log(666);
          // bus.$emit("username", res.username);
        } else this.$message({ message: res.message, type: "error" });

        // if (res.code === -4)
        //   setTimeout(()=>{this.$router.push("/login")},1000)
      });
    },
  },
  created() {
    this.getInfo();
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
