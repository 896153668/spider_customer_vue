<template>
  <div class="main">
    <div class="cardOut">
      <div
        class=""
        style="text-align: center; margin-bottom: 30px; font-size: 38px"
      >
        商家后台
      </div>

      <el-card class="box-card">
        <div class="loginText" style="color: #898989">账号密码登录</div>

        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          status-icon="true"
        >
          <el-form-item
            label=""
            prop="username"
            style="width: 100%; margin-left: -50px"
          >
            <el-input
              v-model="loginForm.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label=""
            prop="password"
            style="width: 100%; margin-left: -50px"
          >
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>

          <el-button
            type="primary"
            class="loginBut"
            @click="submitForm('loginForm')"
            style="margin-bottom: 20px"
            >登录
          </el-button>
        </el-form>

        <!-- <div class="loginBox1">
          <el-link
            style="margin-right: 15px; color: #898989"
            href="#"
            :underline="true"
            @click="reg"
            >注册账号</el-link
          >
          <el-divider direction="vertical"></el-divider>

          <el-link
            href=""
            target=""
            style="margin-left: 15px; color: #898989"
            :underline="true"
            >忘记密码</el-link
          >
        </div> -->
      </el-card>

      <el-dialog
        title="注册账号"
        v-model="dialogVisible"
        width="500px"
        style="margin-left: 20%"
      >
        <el-form
          :model="regForm"
          :rules="rulesReg"
          ref="regForm"
          label-width="100px"
          class="userInfo"
          style="width: 90%"
          status-icon="true"
        >
          <el-form-item
            label="用户名:"
            style="width: 100%; float: left"
            prop="username"
          >
            <el-input
              placeholder="请输入内容"
              v-model="regForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码:"
            style="width: 100%; float: left"
            prop="password"
          >
            <el-input
              placeholder="请输入内容"
              v-model="regForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱:"
            style="width: 100%; float: left"
            prop="email"
          >
            <el-input
              placeholder="请输入内容"
              v-model="regForm.email"
            ></el-input>
          </el-form-item>

          <el-button
            type="primary"
            style="margin-left: 15%; margin-top: 30px"
            @click="register('regForm')"
            >注册</el-button
          >
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form>
      </el-dialog>
    </div>
  </div>

  <!-- <div>login test</div> -->
</template>

<script>
import request from "@/utils/request"
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "123",
        password: "123",
      },
      regForm: {
        username: "",
        password: "",
        email: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
      rulesReg: {
        username: [
          { required: true, message: "请输入账号", trigger: "change" },
          { min: 6, message: "账号最短6位" },
          { max: 12, message: "账号最长12位" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, message: "密码最短6位" },
          { max: 12, message: "密码最长12位" },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "change",
            type: "email",
          },
        ],
      },
      dialogVisible: false,
    }
  },
  // created() {
  //   window.location.href = "../../static/index.html"
  // },
  methods: {
    reg() {
      this.dialogVisible = true
      this.form = {}
    },
    register(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          request.get("/user/getIp").then((res) => {
            console.log(res)
            this.regForm.regIp = res
            request.post("/user/register", this.regForm).then((res) => {
              console.log(res)
              if (res.code === 1) {
                this.$message({ message: "恭喜你，注册成功", type: "success" })
                this.dialogVisible = false
              } else {
                if (res.code === -3)
                  this.$message.error(res.message.defaultMessage)
                else this.$message.error(res.message)
              }
            })
          })
        } else {
          return false
        }
      })
    },
    submitForm(formName) {
      // this.$http.get("http://pv.sohu.com/cityjson?ie=utf-8").then(res =>{
      //   console.log(res)
      // })

      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          request.post("/admin/login", this.loginForm).then((res) => {
            console.log(res)
            if (res.code === 1) {
              this.$message({ message: "恭喜你，登陆成功", type: "success" })
              this.$router.push("/home")

              console.log(document.cookie)
              // console.log(res.headers["set-cookie"]);

              // window.location="/#/info"
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  /*background-color: #e7ecf2;*/
  background-image: url("../assets/imgs/login.jpg");
  background-size: 100% 100%;
}

.cardOut {
  /* float: right; */
  width: 450px;
  height: 400px;

  margin-left: calc(50vw - 225px);
  margin-top: calc(50vh - 300px);
  text-align: center;
}

.loginText {
  float: left;
  width: 100%;
  height: 50px;
  font-size: 18px;
  text-align: center;
}
.loginBut {
  float: left;
  width: 75%;
  margin-left: 12.5%;
  margin-top: 2px;
}
</style>
