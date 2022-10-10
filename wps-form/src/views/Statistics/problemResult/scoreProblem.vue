<template>
  <div class="input-component" ref="component">
    <div class="input-area">
      <span> {{ index }}.{{ itemdata.title }}</span>
      <span>{{ itemdata.required ? " (必填)" : "" }}</span>
      <div class="answer-area">
        <div v-if="answer">
          <el-rate v-model="props.answer" allow-half disabled />
        </div>
        <div v-else>
          <span>未填写</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Iproblem } from "../../../types";
export default defineComponent({
  name: "inputProblem",
  props: {
    index: {
      type: Number,
      default: 0,
    },
    itemdata: {
      type: Object,
      default: () => ({} as Iproblem),
    },
    answer: {
      type: Number,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>
<style scoped>
.problem-title {
  margin: 10px 0;
  width: 90%;
  height: 36px;
  font-size: 16px;
  border: none;
}

.answer-area {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
}
</style>
