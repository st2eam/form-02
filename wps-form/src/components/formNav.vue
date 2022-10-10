<template>
  <div className="form-nav">
    <div className="nav-tabs">
      <router-link
        :to="'/statistics/' + id"
        class="nav-tab first-tab"
        exact-active-class="tab-active"
      >
        <span>数据统计&分析</span>
      </router-link>
      <router-link
        :to="'/formproblem/' + id"
        class="nav-tab"
        exact-active-class="tab-active"
      >
        <span>表单问题</span>
      </router-link>
      <router-link
        :to="'/create/' + id"
        class="nav-tab"
        exact-active-class="tab-active"
      >
        <span>分享</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "formNav",
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style>
.form-nav {
  position: fixed;
  top: 8vh;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 6vh;
  z-index: 10;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.nav-tabs {
  display: flex;
  height: 100%;
  min-width: 400px;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.first-tab {
  margin: 0 30px;
}
.nav-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1rem;
  text-decoration: none;
}
.nav-tab:hover {
  color: #409eff;
}
.tab-active {
  color: #409eff;
  border-bottom: 2px solid #409eff;
}
.router-link-active {
  color: #409eff;
}
</style>
