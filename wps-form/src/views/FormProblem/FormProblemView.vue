<template>
  <div class="formproblem-view">
    <FormNav :id="id" />
    <main>
      <el-form>
        <span class="form-title">{{ formTitle }}</span>
        <span class="form-subtitle">{{ formSubtitle }}</span>
        <component
          class="problem-item"
          v-for="(item, index) in cpnArray"
          :is="`${item.type}Problem`"
          :key="index"
          :index="index + 1"
          :itemdata="item"
        ></component>
      </el-form>
      <el-button class="footer-btn" type="primary" @click="submit"
        >提交</el-button
      >
      <router-link :to="'/fillform/' + id" class="tofillform">
        <span>填写表单</span>
      </router-link>
    </main>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, onMounted, ref } from "vue";
import dateProblem from "../../components/problemFilling/dateProblem.vue";
import inputProblem from "../../components/problemFilling/inputProblem.vue";
import multiSelectProblem from "../../components/problemFilling/multiSelectProblem.vue";
import pullSelectProblem from "../../components/problemFilling/pullSelectProblem.vue";
import scoreProblem from "../../components/problemFilling/scoreProblem.vue";
import singleSelectProblem from "../../components/problemFilling/singleSelectProblem.vue";
import timeProblem from "../../components/problemFilling/timeProblem.vue";
import FormNav from "../../components/formNav.vue";
import { useRoute } from "vue-router";
import { Iproblem } from "../../types";
import { getForm } from "../../services/api";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "FormProblemView",
  components: {
    FormNav,
    dateProblem,
    inputProblem,
    multiSelectProblem,
    pullSelectProblem,
    scoreProblem,
    singleSelectProblem,
    timeProblem,
  },
  setup() {
    const route = useRoute();
    const id = ref(route.params.id as string);
    const cpnArray = ref([] as Iproblem[]);
    const formTitle = ref("");
    const formSubtitle = ref("");
    const load = async () => {
      const res = await getForm({ id: id.value });
      if (res.stat === "ok") {
        cpnArray.value = res.data.item.problems;
        formTitle.value = res.data.item.title;
        formSubtitle.value = res.data.item.subTitle;
      } else {
        ElMessage.error(res.msg);
      }
    };
    onMounted(async () => {
      await load();
    });
    // 预览状态不允许提交
    const submit = () => {
      ElMessage("预览状态暂不支持提交");
    };
    return { cpnArray, formTitle, formSubtitle, id, submit };
  },
});
</script>
<style scoped>
.formproblem-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #f2f4f7;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.form-nav {
  display: flex;
  justify-content: space-around;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 800px;
  margin-top: 8vh;
  margin-bottom: 4vh;
  padding-bottom: 30px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.el-form {
  width: 850px;
  display: flex;
  min-height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 120px;
  margin-bottom: 20px;
}
.form-title {
  margin: 20px 0;
  width: 100%;
  height: 48px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border: none;
}

.form-subtitle {
  margin: 10px 0;
  width: 100%;
  height: 36px;
  font-size: 18px;
  text-align: center;
}

.problem-item {
  margin: 10px 0;
  padding: 20px;
  width: 100%;
}

.footer-btn {
  cursor: not-allowed;
  background-color: #79bbff;
  margin: 10px;
  width: 160px;
}
.tofillform span {
  font-size: 0.8rem;
  color: #409eff;
  cursor: pointer;
}
@media screen and (min-width: 768px) {
  .main {
    width: 768px;
  }
}
</style>
