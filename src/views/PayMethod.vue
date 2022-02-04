<template>
  <div>
    <div style="margin-left: 30px; margin-top: 15px">
      <el-button type="primary" @click="dialogVisible = true"
        >新增收款方式</el-button
      >
    </div>
    <div class="tableDataBox">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%; margin-top: 20px; text-align: center"
        ref="refTable"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="auto"
          min-width="40px"
        ></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="status" label="是否启用">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              style="margin-left: 20px"
              @change="updatePayStatus(scope.row.id)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <el-button type="primary" @click="changeSort(scope.row.id, 0)"
              >置顶</el-button
            >
            <el-button type="primary" @click="changeSort(scope.row.id, -1)"
              >上移</el-button
            >
            <el-button type="primary" @click="changeSort(scope.row.id, 1)"
              >下移</el-button
            >

            <el-button type="danger" @click="deletePayMethod(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="新增收款方式" v-model="dialogVisible" width="600px">
        <el-form
          :rules="rules"
          :model="addForm"
          ref="addForm"
          style="width: 100%"
        >
          <el-form-item
            label="类型:"
            style="width: 100%; float: left"
            prop="type"
          >
            <el-input
              placeholder="请输入"
              v-model="addForm.type"
              style="width: 80%; float: left; font-size: 18px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="内容:"
            style="width: 100%; float: left"
            prop="content"
          >
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入"
              v-model="addForm.content"
              style="width: 80%; float: left; font-size: 18px"
            ></el-input>
          </el-form-item>

          <el-button
            type="primary"
            style="margin-left: 30%; margin-top: 30px"
            size="medium"
            @click="addPayMethod()"
            >确认修改</el-button
          >
          <el-button size="medium" @click="dialogVisible = false"
            >取消修改</el-button
          >
        </el-form>
      </el-dialog>

      <el-pagination
        style="text-align: center; margin-top: 30px"
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :current-page="nowPage"
        :page-size="15"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import bus from "../assets/js/bus";
import request from "@/utils/request";

export default {
  name: "Appointment",
  data() {
    return {
      addForm: {},
      tableData: [],
      dialogVisible: false,
      total: 0,
      nowPage: 0,
      nowOpenRow: 0,
      rules: {
        type: [{ required: true, message: "请输入", trigger: "change" }],
        content: [{ required: true, message: "请输入", trigger: "change" }],
      },
    };
  },
  methods: {
    updatePayStatus(id) {
      request.get("/admin/updatePayStatus?id="+id).then((res) => {
        console.log(res);
        if (res.code === 1) {
          // res = res.data;
          // bus.$emit('username',res.username)
          this.$message({ message: res.message, type: "success" });
          // this.dialogVisible = false;
          this.getPage(this.nowPage);
        } else if (res.code === -4) {
          this.$message({ message: "您尚未登录!", type: "error" });
          setTimeout(function () {
            location.href = "/#/login";
          }, 1000);
        } else this.$message({ message: res.message, type: "error" });
      });
    },
    changeSort(id, i) {
      request.get("/admin/changeSort?id=" + id + "&i=" + i).then((res) => {
        console.log(res);
        if (res.code === 1) {
          // res = res.data;
          // bus.$emit('username',res.username)
          this.$message({ message: res.message, type: "success" });
          // this.dialogVisible = false;
          this.getPage(this.nowPage);
        } else if (res.code === -4) {
          this.$message({ message: "您尚未登录!", type: "error" });
          setTimeout(function () {
            location.href = "/#/login";
          }, 1000);
        } else this.$message({ message: res.message, type: "error" });
      });
    },
    addPayMethod() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          request.post("/admin/addPayMethod", this.addForm).then((res) => {
            console.log(res);
            if (res.code === 1) {
              // res = res.data;
              // bus.$emit('username',res.username)
              this.$message({ message: res.message, type: "success" });
              this.dialogVisible = false;
              this.getPage(this.nowPage);
            } else if (res.code === -4) {
              this.$message({ message: "您尚未登录!", type: "error" });
              setTimeout(function () {
                location.href = "/#/login";
              }, 1000);
            } else this.$message({ message: res.message, type: "error" });
          });
        } else {
          this.$message({ message: "请输入正确的数据", type: "error" });
        }
      });

      // let _this = this
    },
    deletePayMethod(ID) {
      request.get("/admin/deletePayMethod?id=" + ID).then((res) => {
        console.log(res);
        if (res.code === 1) {
          // res = res.data;
          // bus.$emit('username',res.username)
          this.$message({ message: res.message, type: "success" });
          // this.dialogVisible = false;
          this.getPage(this.nowPage);
        } else if (res.code === -4) {
          this.$message({ message: "您尚未登录!", type: "error" });
          setTimeout(function () {
            location.href = "/#/login";
          }, 1000);
        } else this.$message({ message: res.message, type: "error" });
      });

      // let _this = this
    },
    getDetail(orderId) {
      console.log(orderId);
      this.dialogTableVisible = true;
      let form = {
        orderId: orderId,
      };
      // let _this = this
      request.post("/detail/getDetails", form).then((res) => {
        console.log(res);
        if (res.code === 1) {
          this.gridData = [];
          for (let i = 0; i < res.data.length; i++) {
            // console.log(res.data.data[i])
            res.data[i].time = res.data[i].time.substr(0, 19).replace("T", " ");
            switch (res.data[i].type) {
              case 1:
                res.data[i].type = "人脸核验";
                break;
              case 2:
                res.data[i].type = "身份核验";
                break;
            }
            switch (res.data[i].state) {
              case 1:
                res.data[i].state = "正在进行";
                break;
              case 2:
                res.data[i].state = "成功通过";
                break;
              case 3:
                res.data[i].state = "未通过";
                break;
              case 4:
                res.data[i].state = "未完成";
                break;
              case 5:
                res.data[i].state = "其他情况";
                break;
            }
            // if (res.data.data[i].state === 2){

            // }
            this.gridData.push(res.data[i]);
          }
        } else this.$message({ message: res.message, type: "error" });
      });
    },
    // 查询个人资料
    getInfo() {
      // let _this = this
      request.get("/user/getInfo").then((res) => {
        // console.log(res.data)
        if (res.code === 1) {
          res = res.data;
          // bus.$emit('username',res.username)
        } else if (res.code === -4) {
          this.$message({ message: "您尚未登录!", type: "error" });
          setTimeout(function () {
            location.href = "/#/login";
          }, 1000);
        } else this.$message({ message: res.message, type: "error" });
      });
    },
    getOrders() {
      // let _this = this
      // request.get("/order/getOrders").then(res =>{
      //   console.log(res.data)
      //   if (res.data.code === 1){
      //     for (let i=0;i<res.data.data.length; i++){
      //       res.data.data[i].time = res.data.data[i].time.substr(0,19).replace("T"," ")
      //       this.tableData.push(res.data.data[i])
      //     }
      //   }else
      //     this.$message({message: res.data.message, type: 'error'});
      //
      // })
    },
    getPage(page) {
      this.tableData = [];
      // let _this = this
      request.get("/admin/pagePayMethod?page=" + page).then((res) => {
        console.log(res);
        if (res.code === 1) {
          this.$message({ message: "获取成功", type: "success" });
          this.total = res.data.totalElements;
          for (let i = 0; i < res.data.content.length; i++) {
            // res.data.data.content[i].time = res.data.data[i].time.substr(0,19).replace("T"," ")
            this.tableData.push(res.data.content[i]);
          }
          console.log(this.tableData);
        } else this.$message({ message: res.data.message, type: "error" });
      });
    },
    handleCurrentChange(val) {
      this.getPage(val - 1);
    },
  },
  created() {
    // this.getInfo();
    // this.getOrders();
    this.getPage(0);
  },
};
</script>

<style scoped>
.tableDataBox {
  /*position: relative;*/
  float: left;
  width: 95%;
  height: 100%;
  margin-left: 3%;
  min-height: 10px;
  /*background-color: darkgreen;*/
}
</style>
