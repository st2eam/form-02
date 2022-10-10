<template>
  <div class="input-component" ref="component" v-focus>
    <div class="input-area">
      <span> {{ index }}.</span>
      <input
        class="problem-title"
        placeholder="请输入问题"
        @focus="focus"
        @blur="blur"
        @input="inputChange"
        :value="props.prop_title"
      />
      <el-time-picker placeholder=" 时 分 秒" disabled />
    </div>
    <div class="functional-area">
      <el-dropdown>
        <span class="el-dropdown-link"> {{ type }} </span>
      </el-dropdown>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "timeProblem",
  props: {
    index: {
      type: Number,
      default: 0,
    },
    prop_repect: {
      type: Boolean,
      default: false,
    },
    prop_title: {
      type: String,
      default: "",
    },
  },

  directives: {
    focus: {
      // 指令的定义
      mounted(el) {
        el.focus();
      },
    },
  },

  setup(props, ctx) {
    const type = ref("时间题");
    let component = ref(null);
    const focus = () => {
      if (component.value) {
        const div: HTMLElement = component.value;
        div.style.boxShadow = " 0 0 2px 2px rgba(0, 0, 0, 0.1)";
      }
    };

    const blur = () => {
      if (component.value) {
        const div: HTMLElement = component.value;
        div.style.boxShadow = " 0 0 2px 2px rgba(0, 0, 0, 0)";
      }
    };

    const handleCommand = (command: string) => {
      type.value = command;
    };

    const inputChange = (e: Event) => {
      ctx.emit("inputChange", e, props.index);
    };
    return {
      props,
      type,
      handleCommand,
      focus,
      blur,
      component,
      inputChange,
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

.problem-title:focus {
  outline: none;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
}

.functional-area {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
}
</style>
