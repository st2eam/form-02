<template>
  <div class="wrap">
    <div class="container">
      <div class="topbar">
        <div class="logout" @click="onLogout">退出账号</div>
      </div>
      <div class="info box">
        <div class="info-avater">
          <div class="cover-mask"></div>
          <span class="cover-text" @click.stop="showChangeAvatarDialog"
            >修改头像</span
          >
          <el-avatar
            class="avatar"
            :size="80"
            :src="
              userInfo.avatar
                ? userInfo.avatar
                : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            "
          />
          <el-dialog v-model="avatDialogVisible" title="上传新头像" width="30%">
            <el-upload
              action=""
              class="avatar-uploader"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              <p>上传图片仅支持jpg、png、jpeg格式，且不超过2M</p>
            </el-upload>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="avatDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitAvatar(imageUrl)">
                  确定
                </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
        <div class="info-nickname">
          <span>{{ userInfo.nickname }}</span>
        </div>
        <div class="info-userid">
          <span>id：{{ userInfo.account }}</span>
          <span>普通用户</span>
        </div>
      </div>
      <div class="real-name box">
        <div class="notice">
          <span>使用真实姓名，让工作伙伴认识你（一周内仅可修改 2 次昵称）</span>
        </div>
        <div class="content">
          <span v-if="!isChangeRealName">
            {{ userInfo.nickname }}
          </span>
          <span class="change" v-if="!isChangeRealName" @click="changeRealName">
            修改
          </span>
          <el-form-item v-if="isChangeRealName">
            <el-input
              class="real-name-input"
              type="text"
              v-model="realName"
              :placeholder="userInfo.nickname"
              required
            />
          </el-form-item>
          <el-form-item v-if="isChangeRealName">
            <el-button @click="changeRealName">取消</el-button>
            <el-button type="primary" @click="submitRealName(realName)">
              确认
            </el-button>
          </el-form-item>
        </div>
      </div>
      <div class="change-psd box">
        <div class="notice">
          <span>安全设置</span>
        </div>
        <div class="content">
          <span>修改密码</span>
          <span class="change" @click="psdFormVisible = true">修改</span>
        </div>
        <el-dialog v-model="psdFormVisible" title="修改密码">
          <el-form :model="psdform">
            <el-form-item label="原密码" :label-width="formLabelWidth">
              <el-input
                v-model="psdform.oldPwd"
                autocomplete="off"
                type="password"
                show-password
                required
              />
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
              <el-input
                v-model="psdform.pwd"
                autocomplete="off"
                type="password"
                show-password
                required
              />
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth">
              <el-input
                v-model="psdform.confirmPwd"
                autocomplete="off"
                type="password"
                show-password
                required
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="psdFormVisible = false">取消</el-button>
              <el-button type="primary" @click="submitChangePsd(psdform)">
                确定
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <div class="touserinfo box">
        <div class="notice">
          <span>查看个人信息文件</span>
        </div>
        <div class="content">
          <span>个人信息查询</span>
          <router-link to="/userinfo">
            <span class="change">查看</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { Ipassword, Iuser } from "../../types";
import { changePwd, getInfo, logout, setInfo } from "../../services/api";
import type { UploadProps } from "element-plus";
import { useStore } from "vuex";
import router from "../../router";
export default defineComponent({
  name: "UserCenterView",
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
    //退出账号
    const store = useStore();
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
    // 修改真实姓名
    const isChangeRealName = ref<boolean>(false);
    const realName = ref<string>("");
    const changeRealName = () => {
      isChangeRealName.value = !isChangeRealName.value;
    };
    const submitRealName = async (realName: string) => {
      isChangeRealName.value = !isChangeRealName.value;
      const newInfo: Iuser = {
        nickname: realName,
        avatar: userInfo.value.avatar,
        userid: userInfo.value.userid,
        ctime: userInfo.value.ctime,
        utime: userInfo.value.utime,
        account: userInfo.value.account,
        status: userInfo.value.status,
      };
      let res = await setInfo(newInfo);
      if (res.stat === "ok") {
        ElMessage({
          message: "修改成功",
          type: "success",
        });
        router.go(0);
      } else {
        ElMessage.error(res.msg);
      }
    };

    // 修改密码
    const pwdForm = ref<Ipassword>({ oldPwd: "", pwd: "", confirmPwd: "" });
    const psdFormVisible = ref(false);
    const formLabelWidth = "100px";
    const psdform = reactive({
      oldPwd: "",
      pwd: "",
      confirmPwd: "",
    });
    const submitChangePsd = async (pwd: Ipassword) => {
      psdFormVisible.value = false;
      let res = await changePwd(pwd);
      if (res.stat === "ok") {
        ElMessage({
          message: "修改成功",
          type: "success",
        });
      } else {
        ElMessage.error(res.msg);
      }
    };

    //修改头像
    const avatDialogVisible = ref(false);
    const imageUrl = ref<string>("");
    const submitAvatar = async (newAvatar: string) => {
      avatDialogVisible.value = false;
      const newInfo: Iuser = {
        nickname: userInfo.value.nickname,
        avatar: newAvatar,
        userid: userInfo.value.userid,
        ctime: userInfo.value.ctime,
        utime: userInfo.value.utime,
        account: userInfo.value.account,
        status: userInfo.value.status,
      };
      let res = await setInfo(newInfo);
      if (res.stat === "ok") {
        ElMessage({
          message: "修改成功",
          type: "success",
        });
        router.go(0);
      } else {
        ElMessage.error(res.msg);
      }
    };
    const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
      if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
        ElMessage.error("头像仅支持JPG、PNG格式!");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error("头像大小超过2MB");
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(rawFile);
      reader.onload = function () {
        imageUrl.value = this.result as string; //图片的base64数据
      };
      return true;
    };

    const showChangeAvatarDialog = () => {
      avatDialogVisible.value = !avatDialogVisible.value;
    };

    return {
      userInfo,
      onLogout,
      submitAvatar,
      isChangeRealName,
      changeRealName,
      realName,
      submitRealName,
      psdFormVisible,
      formLabelWidth,
      pwdForm,
      psdform,
      submitChangePsd,
      avatDialogVisible,
      showChangeAvatarDialog,
      beforeAvatarUpload,
      imageUrl,
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
  max-width: 910px;
  min-width: 650px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.topbar {
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  max-width: 910px;
  padding: 0 20px;
}
.logout {
  font-family: Helvetica Neue;
  font-size: 12px;
  color: #969696;
  cursor: pointer;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  margin-top: 12px;
  background: #fff;
  border: 1px solid #e7e9eb;
}
.info {
  margin-top: 0px;
}

.info-avater {
  display: flex;
  position: relative;
  overflow: hidden;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 100%;
  height: auto;
  transition: all 0.5s;
}

.cover-mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #000;
  opacity: 0;
  border-radius: 50%;
  transition: all 0.2s;
}

.cover-text {
  position: absolute;
  cursor: pointer;
  font-size: 14px;
  z-index: 5;
  color: #fff;
  opacity: 0;
  transform: translate(-50% -50%);
  transform: scale(0.7);
  transition: all 0.2s;
}

.info-avater:hover .cover-mask {
  opacity: 0.5;
}

.info-avater:hover .cover-text {
  opacity: 1;
  transform: scale(1);
}
.info-userid {
  font-family: Helvetica Neue;
  font-size: 12px;
}
.info-userid span {
  margin: 0 10px;
}
.info-userid span:last-child {
  padding-left: 20px;
  margin-right: 40px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}
.notice {
  width: 100%;
  font-size: 14px;
  color: #969696;
}
.content {
  width: 100%;
  display: flex;
  margin-top: 24px;
  justify-content: space-between;
}
.change {
  color: #2e68f8;
  font-size: 14px;
  cursor: pointer;
}
.el-dialog {
  width: 500px;
  top: 20vh;
}
.info-nickname {
  margin-top: 20px;
  margin-bottom: 10px;
}
.el-input {
  width: 300px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-avatar {
  width: 80px;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  margin-right: 20px;
  background: 
    /*上左*/ linear-gradient(to top, #8c939d, #8c939d) left top
      no-repeat,
    /*左上*/ linear-gradient(to right, #8c939d, #8c939d) left top no-repeat,
    /*上右*/ linear-gradient(to left, #8c939d, #8c939d) right top no-repeat,
    /*上右*/ linear-gradient(to bottom, #8c939d, #8c939d) right top no-repeat,
    /*下左*/ linear-gradient(to left, #8c939d, #8c939d) left bottom no-repeat,
    /*左下*/ linear-gradient(to bottom, #8c939d, #8c939d) left bottom no-repeat,
    /*下右*/ linear-gradient(to top, #8c939d, #8c939d) right bottom no-repeat,
    /*右下*/ linear-gradient(to left, #8c939d, #8c939d) right bottom no-repeat;
  background-size: 2px 16px, 16px 2px, 2px 16px, 16px 2px;
}
</style>
