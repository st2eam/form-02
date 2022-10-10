<template>
  <div class="input-component" ref="component">
    <div class="input-area">
      <span> {{ index }}.{{ itemdata.title }}</span>
      <span>{{ itemdata.required ? "(必填)" : "" }}</span>
      <div class="answer-area">
        <el-input
          placeholder="Please input"
          v-model="input"
          @input="resultChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Iproblem } from "../../types";
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
  },
  setup(props, ctx) {
    const resultChange = () => {
      ctx.emit("resultChange", input.value, props.index - 1);
    };
    const input = ref("");
    return { input, resultChange };
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
}

:deep() .radio-group {
  display: flex;
  flex-wrap: wrap;
}

.radio-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 5px 0;
}

.radio-item span {
  margin: 0 10px;
  opacity: 0;
  color: #1c9cfd;
}

.radio-item :hover span {
  opacity: 1;
}

.functional-area {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
}
</style>
