<template>
  <div class="login-view">
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <form onsubmit="return false;">
          <h1>Create Account</h1>
          <el-input
            class="form_input"
            type="text"
            v-model="state.registerbody.account"
            placeholder="Username"
            required
          />
          <el-input
            class="form_input"
            type="password"
            v-model="state.registerbody.pwd"
            placeholder="Password"
            show-password
            required
          />
          <el-input
            class="form_input"
            type="password"
            v-model="state.registerbody.confirmPwd"
            placeholder="Confirm password"
            show-password
            required
          />
          <button @click="onRegister">Sign Up</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form onsubmit="return false;">
          <h1>Sign in</h1>
          <el-input
            class="form_input"
            type="text"
            v-model="state.loginbody.account"
            placeholder="Username"
            required
          />
          <el-input
            class="form_input"
            v-model="state.loginbody.pwd"
            type="password"
            placeholder="Please input password"
            show-password
            required
          />
          <a href="#" @click="forgetPwd">Forgot your password?</a>
          <button @click="onLogin">Sign In</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button class="ghost" id="signIn">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, reactive } from "vue";
import { Iregister, Ilogin } from "../../types";
import { register, login } from "../../services/api";
import { ElMessage } from "element-plus";
import router from "../../router";
import { useStore } from "vuex";
export default defineComponent({
  name: "LoginView",
  setup() {
    const state = reactive({
      loginbody: {} as Ilogin,
      registerbody: {} as Iregister,
    });
    const store = useStore();

    onBeforeMount(() => {
      if (store.getters.getUsername) {
        router.push("/");
        ElMessage({
          message: "已登录",
          type: "success",
        });
      }
    });

    onMounted(() => {
      const signUpButton = document.getElementById("signUp");
      const signInButton = document.getElementById("signIn");
      const container = document.getElementById("container");

      if (signUpButton && signInButton && container) {
        signUpButton.addEventListener("click", () =>
          container.classList.add("right-panel-active")
        );

        signInButton.addEventListener("click", () =>
          container.classList.remove("right-panel-active")
        );
      }
    });
    //注册
    const onRegister = async () => {
      if (state.registerbody.account === "") {
        ElMessage.error("请输入用户名");
        return;
      }
      if (state.registerbody.pwd.length < 6) {
        ElMessage.error("密码不能少于6位");
        return;
      }
      if (state.registerbody.pwd !== state.registerbody.confirmPwd) {
        ElMessage.error("两次密码不一致");
        return;
      }
      const res = await register(state.registerbody);
      if (res.stat === "ok") {
        ElMessage({
          message: "注册成功",
          type: "success",
        });
      } else {
        ElMessage.error(res.msg);
      }
    };
    //忘记密码
    const forgetPwd = () => {
      ElMessage("忘记就再注册一个吧");
    };
    //登录
    const onLogin = async () => {
      if (state.loginbody.account === "") {
        ElMessage.error("请输入用户名");
        return;
      }
      if (state.loginbody.pwd === "") {
        ElMessage.error("请输入密码");
        return;
      }
      const res = await login(state.loginbody);
      if (res.stat === "ok") {
        router.push("/");
        ElMessage({
          message: "登录成功",
          type: "success",
        });
        store.commit("setUsername", state.loginbody.account);
      } else {
        ElMessage.error(res.msg);
      }
    };
    return { state, onRegister, onLogin, forgetPwd };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");
.login-view {
  font-family: "Montserrat", sans-serif;
  background: #f6f5f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: -20px 0 50px;
  margin-top: 20px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.form_input {
  background: #eee;
  border: none;
  margin: 10px 0;
  width: 80%;
}

button {
  border-radius: 20px;
  border: 1px solid #1c9cfd;
  background: #1c9cfd;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background: transparent;
  border-color: #fff;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay {
  background: #aadafe;
  background: linear-gradient(to right, #aadafe, #1c9cfd) no-repeat 0 0 / cover;
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateY(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  height: 100%;
  width: 50%;
  text-align: center;
  transform: translateY(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateY(0);
}

.overlay-left {
  transform: translateY(-20%);
}

/* Move signin to right */
.container.right-panel-active .sign-in-container {
  transform: translateY(100%);
}

/* Move overlay to left */
.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

/* Bring signup over signin */
.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

/* Move overlay back to right */
.container.right-panel-active .overlay {
  transform: translateX(50%);
}

/* Bring back the text to center */
.container.right-panel-active .overlay-left {
  transform: translateY(0);
}

/* Same effect for right */
.container.right-panel-active .overlay-right {
  transform: translateY(20%);
}

.footer {
  margin-top: 25px;
  text-align: center;
}

.icons {
  display: flex;
  width: 30px;
  height: 30px;
  letter-spacing: 15px;
  align-items: center;
}
</style>
