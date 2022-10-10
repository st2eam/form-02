<template>
  <header class="header">
    <div class="left-wrap">
      <div class="logo">
        <el-icon
          class="back"
          v-if="!(this.$route.name === '金山表单')"
          @click="this.$router.back()"
          ><ArrowLeft
        /></el-icon>
        <router-link to="/" class="logo">
          <img src="../assets/image/logo.svg" class="logo-img" alt="logo" />
          <span class="logo-text">{{ this.$route.name }}</span>
        </router-link>
      </div>
    </div>
    <div class="user-info">
      <el-col :span="12">
        <el-dropdown trigger="click">
          <div class="wrap">
            <el-avatar
              class="el-dropdown-link avatar"
              :size="40"
              :src="
                userInfo.avatar
                  ? userInfo.avatar
                  : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
              "
            />
            <span class="nickname">
              {{ userInfo.nickname }}
            </span>
          </div>
          <template v-slot:dropdown>
            <el-dropdown-menu>
              <router-link to="/usercenter">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <el-dropdown-item @click="undeveloped">
                常用信息管理
              </el-dropdown-item>
              <el-dropdown-item @click="onLogout">退出账号</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getInfo, logout } from "../services/api";
import { ElMessage } from "element-plus";
import router from "../router";
import { undeveloped } from "../utils";
import { Iuser } from "../types";
import { useStore } from "vuex";
export default defineComponent({
  name: "formHeader",
  setup() {
    const store = useStore();
    const userInfo = ref<Iuser>({
      nickname: "",
      avatar: "",
      userid: "",
      ctime: 0,
      utime: 0,
      account: "",
      status: 0,
    });
    onMounted(() => {
      if (
        !(
          store.getters.getUsername === null || store.getters.getUsername === ""
        )
      ) {
        getUserInfo();
      }
    });
    // 初始化用户信息
    const getUserInfo = async () => {
      let res = await getInfo();
      if (res.stat === "ok") {
        userInfo.value = res.data.user;
      }
    };
    const onLogout = async () => {
      let res = await logout();
      if (res.stat === "ok") {
        ElMessage({
          message: "退出账号成功!",
          type: "success",
        });
        store.commit("setUsername", "");
        router.push("/login");
      } else {
        ElMessage.error(res.msg);
      }
    };
    return { onLogout, userInfo, undeveloped };
  },
});
</script>
<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 8vh;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-text {
  font-size: 18px;
}

.back {
  cursor: pointer;
}

.el-dropdown-link {
  cursor: pointer;
}

.avatar {
  min-width: 40px;
}

.wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
}

.nickname {
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
