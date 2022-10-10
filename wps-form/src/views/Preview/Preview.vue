<template>
  <div class="preview">
    <el-form class="main">
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
    <footer>
      <el-button class="footer-btn" @click="this.$router.back()"
        >继续编辑</el-button
      ><el-button class="footer-btn" type="primary" @click="createForm"
        >完成创建</el-button
      >
    </footer>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, ref } from "vue";
import dateProblem from "../../components/problemFilling/dateProblem.vue";
import inputProblem from "../../components/problemFilling/inputProblem.vue";
import multiSelectProblem from "../../components/problemFilling/multiSelectProblem.vue";
import pullSelectProblem from "../../components/problemFilling/pullSelectProblem.vue";
import scoreProblem from "../../components/problemFilling/scoreProblem.vue";
import singleSelectProblem from "../../components/problemFilling/singleSelectProblem.vue";
import timeProblem from "../../components/problemFilling/timeProblem.vue";
import { Iproblem, Icreate } from "../../types";
import { ElMessage } from "element-plus";
import { create, startCollecting } from "../../services/api";
import router from "../../router";
export default defineComponent({
  name: "PreView",
  components: {
    dateProblem,
    inputProblem,
    multiSelectProblem,
    pullSelectProblem,
    scoreProblem,
    singleSelectProblem,
    timeProblem,
  },
  setup() {
    const cpnArray = ref(
      JSON.parse(sessionStorage.getItem("cpnArray")!) as Iproblem[]
    );
    const formTitle = ref(sessionStorage.getItem("formTitle"));
    const formSubtitle = ref(sessionStorage.getItem("formSubtitle"));
    //创建表单
    const createForm = async () => {
      const formData: Icreate = {
        title: formTitle.value as string,
        subTitle: formSubtitle.value as string,
        problems: cpnArray.value as Iproblem[],
      };
      const res = await create(formData);
      if (res.stat === "ok") {
        ElMessage({
          message: "创建成功",
          type: "success",
        });
        const result = await startCollecting({
          id: res.data.id,
        });
        if (result.stat === "ok") {
          ElMessage({
            message: "开始收集表单",
            type: "success",
          });
        } else {
          ElMessage.error(result.msg);
        }
        router.push({
          path: "/create",
          name: "分享",
          params: {
            id: res.data.id,
          },
        });
      } else {
        ElMessage.error(res.msg);
      }
    };
    return { cpnArray, formTitle, formSubtitle, createForm };
  },
});
</script>
<style scoped>
.preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f2f4f7;
  padding: 10px;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 10px 0;
  padding-bottom: 100px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #fff;
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
  margin: 10px;
  width: 160px;
}

@media screen and (min-width: 768px) {
  .main {
    width: 768px;
  }
}
</style>
