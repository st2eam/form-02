<template>
  <div class="fillform-view">
    <main>
      <el-form v-if="!isSubmit">
        <span class="form-title">{{ formTitle }}</span>
        <span class="form-subtitle">{{ formSubtitle }}</span>
        <component
          class="problem-item"
          v-for="(item, index) in cpnArray"
          :is="`${item.type}Problem`"
          :key="index"
          :index="index + 1"
          :itemdata="item"
          @resultChange="resultChange"
        ></component>
      </el-form>
      <div class="show-success" v-else>
        <el-icon size="60px" color="#67C23A"><SuccessFilled /></el-icon>
        <div class="desc">
          <p class="show-title">提交成功</p>
          <p class="show-time">
            今天{{ new Date().getHours() }}:{{ new Date().getMinutes() }}
          </p>
        </div>
      </div>
      <el-button
        v-if="isSubmit"
        class="footer-btn"
        type="primary"
        @click="isSubmit = !isSubmit"
        >再填一份</el-button
      >
      <el-button
        v-else
        class="footer-btn"
        type="primary"
        @click="submit_throttle"
        >提交</el-button
      >
    </main>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, onMounted, ref } from "vue";
import dateProblem from "../../components/problemFilling/dateProblem.vue";
import inputProblem from "../../components/problemFilling/inputProblem.vue";
import multiSelectProblem from "../../components/problemFilling/multiSelectProblem.vue";
import pullSelectProblem from "../../components/problemFilling/pullSelectProblem.vue";
import scoreProblem from "../../components/problemFilling/scoreProblem.vue";
import singleSelectProblem from "../../components/problemFilling/singleSelectProblem.vue";
import timeProblem from "../../components/problemFilling/timeProblem.vue";
import FormNav from "../../components/formNav.vue";
import { Throttle } from "../../utils";
import { useRoute } from "vue-router";
import { Iproblem, IformData } from "../../types";
import { getForm, inputForm } from "../../services/api";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "FillFormView",
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
    const isSubmit = ref(false);
    const cpnArray = ref([] as Iproblem[]);
    const formTitle = ref("");
    const formSubtitle = ref("");
    const formData = ref({} as IformData);

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
      formData.value = {
        formId: id.value,
        problems: cpnArray.value.map((item) => {
          return {
            id: item.id as string,
            type: item.type as string,
            title: item.title,
            required: item.required,
            setting: item.setting,
            result: "",
          };
        }),
      };
    });
    //验证表单
    const validateForm = () => {
      let isValid = true;
      formData.value.problems.forEach((item) => {
        if (item.required && !item.result) {
          isValid = false;
        }
      });
      if (!isValid) {
        ElMessage.error("请填写完整表单");
      }
      return isValid;
    };
    //提交表单
    const submit = async () => {
      if (validateForm()) {
        const res = await inputForm(formData.value);
        if (res.stat === "ok") {
          ElMessage.success("提交成功");
          isSubmit.value = true;
        } else {
          ElMessage.error(res.msg);
        }
      }
    };
    //submit添加节流
    const throttle = new Throttle();
    const submit_throttle = throttle.use(submit, 200);

    const resultChange = (value: object, index: number) => {
      formData.value.problems[index].result = { value } as any;
    };
    return {
      id,
      cpnArray,
      formTitle,
      formSubtitle,
      submit_throttle,
      resultChange,
      isSubmit,
    };
  },
});
</script>
<style scoped>
.fillform-view {
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
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
  width: 100%;
  min-height: 100vh;
  padding: 20px 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #f2f4f7;
}
.el-form {
  width: 850px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 120px;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
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
.show-success {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 20vh;
  background-color: #fff;
}
.show-time {
  font-size: 14px;
  color: #ababab;
}
@media screen and (min-width: 768px) {
  .main {
    width: 768px;
  }
}
</style>
