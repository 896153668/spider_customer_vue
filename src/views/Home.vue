<template>
  <div>
    <div class="homeMain">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="data" label="数据" width="180">
        </el-table-column>
        <el-table-column prop="idCheck" width="180">
          <template #header>
            <el-tag>身份校验</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="faceCheck">
          <template #header>
            <el-tag>人脸核验</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin: 10% 0">
        <el-tag size="medium">剩余余额：{{ money }} </el-tag>
        <el-link
          style="margin-left: 3%"
          href="https://element.eleme.io"
          target="_blank"
          >立即充值</el-link
        >
      </div>

      <el-divider content-position="left">新闻公告</el-divider>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="" name="1">
          <template #title>
            一致性 Consistency 2021/8/11<i class="header-icon el-icon-info"></i>
          </template>
          <div>
            与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
          </div>
          <div>
            在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
          </div>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback" name="2">
          <div>
            控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
          </div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>
            清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
          </div>
          <div>
            帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
          </div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability" name="4">
          <div>
            用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
          </div>
          <div>
            结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- <router-view /> -->
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "App",
  data() {
    return {
      money: "0",
      tableData: [
        {
          data: "今日次数",
          idCheck: "0",
          faceCheck: "0",
        },
        {
          data: "昨日次数",
          idCheck: "0",
          faceCheck: "0",
        },
        {
          data: "今日消费",
          idCheck: "0",
          faceCheck: "0",
        },
        {
          data: "昨日消费",
          idCheck: "0",
          faceCheck: "0",
        },
        {
          data: "总消费",
          idCheck: "0",
          faceCheck: "0",
        },
      ],
    };
  },
  created() {
    request.get("/admin/getInfo").then((res) => {
      console.log(res);
      if (res.code === 1) {
        this.$message({ message: res.message, type: "success" });
        this.tableData[0].idCheck = parseInt(res.data.idCheckToday) +" 次";
        this.tableData[0].faceCheck = parseInt(res.data.faceCheckToday)+" 次";

        this.tableData[1].idCheck =parseInt( res.data.idCheckYes)+" 次";
        this.tableData[1].faceCheck = parseInt(res.data.faceCheckYes)+" 次";

        this.tableData[2].idCheck = res.data.idCheckTodaySpend+" 元";
        this.tableData[2].faceCheck = res.data.faceCheckTodaySpend+" 元";

        this.tableData[3].idCheck = res.data.idCheckYesSpend+" 元";
        this.tableData[3].faceCheck = res.data.faceCheckYesSpend+" 元";

        this.tableData[4].idCheck = res.data.idCheckAllSpend+" 元";
        this.tableData[4].faceCheck = res.data.faceCheckAllSpend+" 元";
        
        this.money = res.data.money;
      } else {
        this.$message({ message: res.message, type: "error" });
      }
    });
  },
};
</script>

<style>
.homeMain {
  float: left;
  margin-top: 3%;
  margin-left: 3%;
  /* margin-right: 3%; */
  width: 40%;
  height: 100%;
  min-height: 10px;
}
</style>
