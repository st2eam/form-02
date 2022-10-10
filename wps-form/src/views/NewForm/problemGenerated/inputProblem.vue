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
      <el-input disabled placeholder="填写者回答区" />
    </div>
    <div class="handle-container" v-show="show_footer">
      <el-checkbox label="不允许重复" size="large" v-model="repeat" />
      <el-tooltip
        content="勾选后，不允许填写者提交和已有数据重复的内容"
        placement="bottom"
        effect="light"
      >
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="functional-area" v-show="show_footer">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ type }}<el-icon class="el-icon--right"><arrow-down /> </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="填空">填空</el-dropdown-item>
            <el-dropdown-item command="电子签名">电子签名</el-dropdown-item>
            <el-dropdown-item command="手机号">手机号</el-dropdown-item>
            <el-dropdown-item command="邮箱">邮箱</el-dropdown-item>
            <el-dropdown-item command="身份证号">身份证号</el-dropdown-item>
            <el-dropdown-item command="其他身份证件"
              >其他身份证件</el-dropdown-item
            >
            <el-dropdown-item command="银行卡号">银行卡号</el-dropdown-item>
            <el-dropdown-item command="数字">数字</el-dropdown-item>
            <el-dropdown-item command="地址">地址</el-dropdown-item>
            <el-dropdown-item command="日期">日期</el-dropdown-item>
            <el-dropdown-item command="时间">时间</el-dropdown-item>
            <el-dropdown-item command="扫码输入">扫码输入</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "inputProblem",
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
    const repeat = ref(props.prop_repect);
    const show_footer = ref(true);
    const type = ref("填空");
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
      handleCommand,
      component,
      type,
      repeat,
      focus,
      blur,
      show_footer,
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

.handle-container {
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
