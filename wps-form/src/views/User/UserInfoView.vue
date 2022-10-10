<template>
  <div class="wrap">
    <div class="container">
      <div class="notice">个人信息查询</div>
      <div class="content">
        <span class="item">
          <span>
            <img
              :src="
                userInfo.avatar == ''
                  ? 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                  : userInfo.avatar
              "
            />
          </span>
          {{ userInfo.nickname }}
        </span>
        <span class="item"><span>用户ID:</span> {{ userInfo.id }}</span>
        <span class="item"><span>账号名:</span> {{ userInfo.account }}</span>
        <span class="item"><span>昵称:</span> {{ userInfo.nickname }}</span>
        <span class="item"><span>创建时间:</span> {{ userInfo.ctime }}</span>
        <span class="item"><span>账号状态:</span> 正常</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Iuser } from "../../types";
import { getInfo } from "../../services/api";
export default defineComponent({
  name: "UserInfoView",
  setup() {
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
      getUserInfo();
    });
    // 初始化用户信息
    const getUserInfo = async () => {
      let res = await getInfo();
      if (res.stat === "ok") {
        userInfo.value = res.data.user;
      }
    };

    return {
      userInfo,
    };
  },
});
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 92vh;
  padding-top: 5px;
  background-color: #f2f4f7;
}
.container {
  display: flex;
  flex-direction: column;
  width: 910px;
  min-height: 400px;
  margin: 50px auto;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.notice {
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.content {
  padding: 60px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
.item {
  padding: 8px 0;
}
.item img {
  width: 48px;
  border-radius: 5px;
}
.item span {
  display: inline-block;
  width: 100px;
  color: #8c8c8c;
}
</style>
