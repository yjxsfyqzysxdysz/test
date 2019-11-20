<template>
  <div class="BaiSirHome">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4" class="logo">
            <span>Logo</span>
          </el-col>
          <el-col :span="4" :offset="2" class="m-tb-10">
            <router-link to="find">探索</router-link>
          </el-col>
          <el-col :span="4" class="m-tb-10">
            <router-link to="fit">运动</router-link>
          </el-col>
          <el-col :span="4" :offset="2" class="m-tb-10">
            <router-link to="myInfo">个人中心</router-link>
          </el-col>
          <el-col :span="4" class="m-tb-10">
            <router-link to="logAndReg">登录/注销</router-link>
          </el-col>
        </el-row>
      </el-header>
      <el-container style="padding:0 20px;">
        <el-aside width="200px">
          <news></news>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import news from './news'
export default {
  name: 'BaiSirHome',
  components: {
    news
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.BaiSirHome {
  .logo {
    background: #91b4e6;
    text-align: center;
    font-weight: bold;
    color: #ffd000;
    padding: 10px 0;
  }
  .m-tb-10 {
    margin: 10px 0;
  }
}
.el-row {
  margin-bottom: 20px;
}

.el-row :last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
