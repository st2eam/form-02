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
      <div class="answer-area">
        <el-radio-group class="radio-group">
          <el-radio
            class="radio-item"
            v-for="(item, index) in setting.options"
            :key="index"
            :label="item.status"
          >
            <input
              class="option-input"
              v-model="item.title"
              @focus="focus"
              @blur="blur"
              @input="settingChange"
            />
            <span>添加文件/图片</span>
            <el-icon @click="deleteOption(index)"><close /></el-icon>
          </el-radio>
        </el-radio-group>
      </div>
      <div class="handle-container">
        <div class="handle-item" @click="addOption">
          <el-icon><Plus /></el-icon> 选项
        </div>
        <el-divider direction="vertical" />
        <div class="handle-item" @click="undeveloped">批量编辑</div>
        <el-divider direction="vertical" />
        <div class="handle-item" @click="undeveloped">添加"其他"项</div>
        <el-divider direction="vertical" />
        <div class="handle-item" @click="undeveloped">设置选项名额</div>
        <el-divider direction="vertical" />
        <div class="handle-item" @click="undeveloped">设置题目关联</div>
      </div>
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
import { defineComponent, onMounted, ref } from "vue";
import { undeveloped } from "../../../utils";
export default defineComponent({
  name: "singleSelectProblem",
  props: {
    index: {
      type: Number,
      default: 0,
    },
    prop_title: {
      type: String,
      default: "",
    },
    prop_setting: {
      type: Object,
      default: () => ({
        options: [
          {
            id: "",
            title: "选项1",
            status: 2,
          },
          {
            id: "",
            title: "选项2",
            status: 2,
          },
        ],
      }),
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
    const setting = ref(props.prop_setting);
    const type = ref("单选题");
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

    const inputChange = (e: Event) => {
      ctx.emit("inputChange", e, props.index);
    };
    const settingChange = () => {
      ctx.emit("settingChange", setting.value, props.index);
    };
    const addOption = () => {
      setting.value.options.push({
        id: "",
        title: "选项" + (setting.value.options.length + 1),
        status: 2,
      });
      settingChange();
    };
    const deleteOption = (index: number) => {
      setting.value.options.splice(index, 1);
      settingChange();
    };
    onMounted(() => {
      settingChange();
    });
    return {
      props,
      type,
      focus,
      blur,
      addOption,
      setting,
      component,
      inputChange,
      settingChange,
      deleteOption,
      undeveloped,
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
  font-size: 12px;
  color: #1c9cfd;
  margin: 20px 0;
}

.handle-item {
  display: flex;
  align-items: center;
  cursor: pointer;
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

.option-input {
  width: 500px;
  height: 36px;
  padding: 0 10px;
  border: 1px solid rgb(64, 158, 255, 0);
  outline: none;
}

.option-input:focus {
  border-bottom: 1px solid #409eff;
}

.functional-area {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
}
</style>
