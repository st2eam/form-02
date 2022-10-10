<template>
  <div class="statistics-view">
    <FormNav :id="id" />
    <div class="wrap">
      <div class="nores" v-if="!existRes">
        <img src="../../assets/image/form.png" />
        <span>暂无收集结果</span>
        <router-link :to="'/create/' + id" class="toshare">
          <span>邀请填写</span>
        </router-link>
      </div>
      <main v-if="existRes">
        <div class="existres">
          <div class="head-part">
            <span>共收集 {{ sum }} 份数据（正在收集）</span>
            <div class="switch">
              <el-icon @click="lastForm"><ArrowLeft /></el-icon>
              <span>
                第 <span class="shadow"> {{ formNo + 1 }} </span> 份
              </span>
              <el-icon @click="nextForm"><ArrowRight /></el-icon>
            </div>
          </div>
          <el-form>
            <span class="form-title">{{ info.title }}</span>
            <span class="form-subtitle">{{ info.subTitle }}</span>
            <component
              class="problem-item"
              v-for="(item, index) in cpnArray"
              :is="`${item.type}Problem`"
              :key="index"
              :index="index + 1"
              :itemdata="item"
              :answer="item.result.value"
            ></component>
          </el-form>
        </div>
      </main>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import dateProblem from "./problemResult/dateProblem.vue";
import inputProblem from "./problemResult/inputProblem.vue";
import multiSelectProblem from "./problemResult/multiSelectProblem.vue";
import pullSelectProblem from "./problemResult/pullSelectProblem.vue";
import scoreProblem from "./problemResult/scoreProblem.vue";
import singleSelectProblem from "./problemResult/singleSelectProblem.vue";
import timeProblem from "./problemResult/timeProblem.vue";
import FormNav from "../../components/formNav.vue";
import { useRoute } from "vue-router";
import { formResult } from "../../services/api";
import { Iproblem } from "../../types";
export default defineComponent({
  name: "StatisticsView",
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
    const existRes = ref<boolean>(false);
    const route = useRoute();
    const id = route.params.id as string;
    const cpnArray = ref([] as Iproblem[]);
    const sum = ref<number>(0);
    const formNo = ref<number>(0);
    const info = ref({});
    const allFormRes = ref();
    onBeforeMount(async () => {
      let res = await formResult(id);
      if (res.stat === "ok") {
        info.value = res.data.info;
        allFormRes.value = res.data.items;
        if (allFormRes.value.length > 0) {
          existRes.value = true;
          sum.value = allFormRes.value.length;
          cpnArray.value = allFormRes.value[formNo.value].result;
        } else {
          existRes.value = false;
        }
      }
    });
    //上一份
    const lastForm = () => {
      if (formNo.value-- <= 0) {
        formNo.value = sum.value - 1;
      }
      cpnArray.value = allFormRes.value[formNo.value].result;
    };
    //下一份
    const nextForm = () => {
      if (formNo.value++ >= sum.value - 1) {
        formNo.value = 0;
      }
      cpnArray.value = allFormRes.value[formNo.value].result;
    };
    return { id, existRes, info, sum, cpnArray, formNo, lastForm, nextForm };
  },
});
</script>
<style scoped>
.statistics-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8vh;
  width: 100%;
  min-height: 100vh;
  background-color: #f2f4f7;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8vh;
  margin-bottom: 4vh;
  max-width: 800px;
  width: 100%;
  min-height: 84vh;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 4vh;
  max-width: 800px;
  width: 100%;
  min-height: 84vh;
  background-color: #fff;
}
.nores {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.nores img {
  width: 100px;
}

.toshare span {
  font-size: 0.8rem;
  color: #409eff;
  cursor: pointer;
}
.head-part {
  padding: 30px 140px;
}
.switch {
  margin-top: 20px;
  width: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-icon {
  cursor: pointer;
}
.el-icon,
.shadow {
  background-color: #f2f4f7;
}
.el-form {
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 120px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.problem-item {
  margin: 10px 0;
  padding: 20px;
  width: 100%;
}
.currentForm {
  text-align: center;
  width: 50px;
  margin: 0 10px;
}
.form-title {
  width: 100%;
  height: 48px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border: none;
}

.form-subtitle {
  width: 100%;
  height: 36px;
  font-size: 18px;
  text-align: center;
}
.head-part > span {
  font-size: 1.4rem;
}
</style>
