<template>
  <div>
    <head-top></head-top>

    <div class="edit_container">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="edit_title">
            <h3 class>联赛</h3>
            <el-select v-model="match" filterable placeholder="请选择">
              <el-option v-for="item in normalOptions" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="edit_title">
            <h3 class>轮次</h3>
            <el-input v-model="round"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="edit_title">
            <h3 class>球探编号</h3>
            <el-input v-model="code"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="edit_title">
            <h3 class style="color: #fff">查询</h3>
            <el-button type="primary" @click="getList(1)">确定</el-button>
          </div>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <div class="table_container">
        <el-table :data="tableData.list" border style="width: 100%">
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column
            property="match"
            label="联赛"
            :filters="options"
            :filter-method="filterMatch"
            width="100"
          ></el-table-column>
          <el-table-column property="round" label="轮次" width="100"></el-table-column>
          <el-table-column property="homeName" label="主队"></el-table-column>
          <el-table-column property="guestName" label="客队"></el-table-column>
          <el-table-column property="score" label="比分"></el-table-column>
          <el-table-column property="code" label="编号"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                plain
                icon="el-icon-edit"
                @click.native.prevent="goReplay(scope.row.code)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                plain
                icon="el-icon-delete"
                @click.native.prevent="deleteAnalyze(scope.row.code)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top : 15px"
          background
          @current-change="getList"
          :page-size="20"
          layout="prev, pager, next, jumper"
          :total="tableData.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getAnalyzeList, deleteAnalyze } from "@/api/getData";
import headTop from "../../components/headTop";

export default {
  data() {
    return {
      match: "",
      round: "",
      code: "",
      tableData: [],
      options: [],
      normalOptions: ["全部", "西甲", "意甲", "英超", "英冠", "德甲", "欧冠"],
    };
  },
  components: {
    headTop,
  },
  computed: {},
  methods: {
    filterMatch(value, row) {
      return row.match === value;
    },
    async getList(page) {
      let params = {
        match: this.match === "全部" ? "" : this.match,
        round: this.round,
        code: this.code,
        page: page || 1,
      };

      const res = await getAnalyzeList(params);
      if (res.data.code === 200) {
        this.$message({
          type: "success",
          message: "查询成功",
        });
        this.tableData = res.data.data;
        let arr = [],
          options = [];
        this.tableData.list.forEach((item) => {
          if (!arr.includes(item.match)) {
            options.push({
              text: item.match,
              value: item.match,
            });
            arr.push(item.match);
          }
        });
        this.options = options;
      } else {
        this.$message.error("查询失败");
      }
    },
    goReplay(code) {
      this.$router.push({ path: "/replay", query: { code: code } });
    },
    async deleteAnalyze(code) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await deleteAnalyze(code);
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList(1);
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less">
@import "../../style/mixin";
.edit_container {
  padding: 40px;
  margin-bottom: 40px;
}
.editer {
  height: 350px;
}
.edit_title {
  margin-bottom: 10px;
}
.submit_btn {
  text-align: center;
}
</style>
