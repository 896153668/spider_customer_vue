<template>
  <div>
    <div class="tableDataBox">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%; margin-top: 20px; text-align: center"
        @cell-click="cellClick"
        @expand-change="expandOpen"
        ref="refTable"
      >
        <!-- <el-table-column type="expand">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.time"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
            >
              {{ activity.type }}&#12288;&#12288;&#12288;{{ activity.data }}&#12288;&#12288;&#12288;{{
                activity.state
              }}&#12288;&#12288;&#12288;{{ activity.ip }}&#12288;&#12288;&#12288;{{ activity.province }}
            </el-timeline-item>
          </el-timeline>
        </el-table-column> -->
        <el-table-column
          prop="id"
          label="ID"
          width="auto"
          min-width="40px"
        ></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="caseHistory" label="病例史"></el-table-column>
        <el-table-column prop="ip" label="ip"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <el-button type="primary" @click="updateState(scope.row)"
              >修改状态</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="修改状态" v-model="dialogVisible" width="600px">
        <el-form :model="updateStateForm" style="width: 100%">
          <el-form-item
            label="内容:"
            style="width: 100%; float: left"
            prop="state"
          >
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入"
              v-model="updateStateForm.state"
              style="width: 80%; float: left; font-size: 18px"
            ></el-input>
          </el-form-item>

          <el-button
            type="primary"
            style="margin-left: 30%; margin-top: 30px"
            size="medium"
            @click="updateStateSubmit()"
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
      updateStateForm: {
        id: "",
        state: "",
      },
      tableData: [],
      gridData: [],
      dialogVisible: false,
      total: 0,
      nowPage: 0,
      nowOpenRow: 0,
    };
  },
  methods: {
    updateStateSubmit() {
      request.post("/admin/updateState", this.updateStateForm).then((res) => {
        console.log(res.data);
        if (res.code === 1) {
          this.getPage(this.nowPage);
          this.$message({ message: "更新成功", type: "success" });
          this.dialogVisible=false;
        } else this.$message({ message: res.data.message, type: "error" });
      });
    },
    updateState(row) {
      this.updateStateForm.id = row.id;
      this.updateStateForm.state = row.state;
      this.dialogVisible = true;
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
      request.get("/admin/page?page=" + page).then((res) => {
        console.log(res);
        if (res.code === 1) {
          this.$message({ message: "获取成功", type: "success" });
          this.total = res.data.totalElements;
          for (let i = 0; i < res.data.content.length; i++) {
            // res.data.data.content[i].time = res.data.data[i].time.substr(0,19).replace("T"," ")
            this.tableData.push(res.data.content[i]);
          }
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
