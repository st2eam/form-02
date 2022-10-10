<template>
  <div class="new-form-view">
    <!-- 左侧题目区域 -->
    <div class="left">
      <h3 class="left-title">添加题目</h3>
      <div class="btn-container">
        <el-button
          v-for="item in state.problemTypes"
          :key="item.title"
          class="type-btn"
          @click="addProblem(item)"
        >
          {{ item.title }}
        </el-button>
      </div>
      <h3 class="left-title">基础题目</h3>
      <div class="btn-container">
        <el-button
          v-for="item in state.BasicProblems"
          :key="item.title"
          class="type-btn"
          @click="addProblem(item)"
        >
          {{ item.title }}
        </el-button>
      </div>
      <h3 class="left-title">我的常用题</h3>
      <div class="btn-container">
        <starProblemBtn
          v-for="item in state.starProblems"
          :key="item.id"
          @onClick="addProblem(item.problem)"
          @onDelete="cancelStar(item.id)"
          >{{ item.problem.title }}</starProblemBtn
        >
      </div>
    </div>
    <!-- 表单生成题目区域 -->
    <main class="main">
      <input
        class="form-title"
        v-model="formTitle"
        placeholder="请输入表单标题"
        required
      />
      <input
        class="form-subtitle"
        v-model="formSubtitle"
        placeholder="请输入表单副标题"
        required
      />
      <component
        class="problem-item"
        v-for="(item, index) in cpnArray"
        :is="`${item.type}Problem`"
        :key="index"
        :index="index + 1"
        :tabindex="index"
        :prop_title="item.title"
        :prop_setting="item.setting"
        draggable="true"
        @inputChange="inputChange"
        @settingChange="settingChange"
        @dragstart="dragstart(item)"
        @dragenter="dragenter(item, $event)"
        @dragend="dragend()"
        @dragover="dragover($event)"
      >
        <!-- 题目底部编辑模块 -->
        <el-divider direction="vertical" />
        <el-button
          class="functional-item functional-button"
          @click="copyProblem(index)"
          >复制</el-button
        >
        <el-divider direction="vertical" />
        <el-checkbox
          class="functional-item functional-checkbox"
          label="必填"
          v-model="item.required"
        />
        <el-divider direction="vertical" />
        <el-icon
          class="functional-item functional-icon"
          @click="deleteProblem(index)"
          ><Delete
        /></el-icon>
        <el-dropdown trigger="click">
          <el-icon class="functional-item functional-icon">
            <MoreFilled />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="undeveloped">
                添加图片/文件(标题)
              </el-dropdown-item>
              <el-dropdown-item @click="undeveloped">
                添加题目说明
              </el-dropdown-item>
              <el-dropdown-item @click="collectProblem(item)">
                将此题添加为常用题
              </el-dropdown-item>
              <el-dropdown-item @click="undeveloped">隐藏题目</el-dropdown-item>
              <el-dropdown-item @click="undeveloped">
                将此题设置为不可填写
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </component>
    </main>
    <!-- 按钮功能区 -->
    <div class="right">
      <el-button class="preview-btn" @click="preview"> 预览 </el-button>
      <el-button class="save-btn" @click="saveDrafts">保存草稿</el-button>
      <el-button class="submit-btn" type="primary" @click="createForm"
        >完成创建</el-button
      >
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, onBeforeMount, reactive, ref } from "vue";
import dateProblem from "./problemGenerated/dateProblem.vue";
import inputProblem from "./problemGenerated/inputProblem.vue";
import multiSelectProblem from "./problemGenerated/multiSelectProblem.vue";
import pullSelectProblem from "./problemGenerated/pullSelectProblem.vue";
import scoreProblem from "./problemGenerated/scoreProblem.vue";
import singleSelectProblem from "./problemGenerated/singleSelectProblem.vue";
import timeProblem from "./problemGenerated/timeProblem.vue";
import starProblemBtn from "./starProblemBtn.vue";
import { undeveloped } from "../../utils";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import router from "../../router";
import {
  problemType,
  problemBasic,
  problemStar,
  starProblem,
  cancelStarProblem,
  create,
  startCollecting,
} from "../../services/api";
import { Iproblem, IproblemData, Isetting, Icreate } from "../../types";

export default defineComponent({
  name: "NewFormView",
  components: {
    dateProblem,
    inputProblem,
    multiSelectProblem,
    pullSelectProblem,
    scoreProblem,
    singleSelectProblem,
    timeProblem,
    starProblemBtn,
  },
  setup() {
    const route = useRoute();
    const cpnArray = ref(
      (JSON.parse(sessionStorage.getItem("cpnArray")!) as Iproblem[]) || []
    );
    const formTitle = ref(sessionStorage.getItem("formTitle") || "");
    const formSubtitle = ref(sessionStorage.getItem("formSubtitle") || "");
    const state = reactive({
      problemTypes: [],
      BasicProblems: [],
      starProblems: [],
    });
    //加载数据
    const load = async () => {
      const typeRes = await problemType();
      state.problemTypes = typeRes.data.problemTypes;
      const basicRes = await problemBasic();
      state.BasicProblems = basicRes.data.basicProblems;
      const starRes = await problemStar();
      state.starProblems = starRes.data.items;
    };
    //添加题目
    const addProblem = (item: Iproblem) => {
      cpnArray.value.push({
        title: item.title,
        type: item.type,
        required: item.required || false,
        setting: item.setting,
      });
    };
    // 复制题目
    const copyProblem = (index: number) => {
      cpnArray.value.push({
        title: cpnArray.value[index].title,
        type: cpnArray.value[index].type,
        required: cpnArray.value[index].required,
        setting: cpnArray.value[index].setting,
      });
    };
    // 收藏题目
    const collectProblem = async (item: Iproblem) => {
      const problemData: IproblemData = {
        problem: item,
      };
      const res = await starProblem(problemData);
      if (res.stat === "ok") {
        ElMessage({
          message: "增加常用题目成功",
          type: "success",
        });
        load();
      } else {
        ElMessage.error(res.msg);
      }
    };
    //删除题目
    const deleteProblem = (index: number) => {
      cpnArray.value.splice(index, 1);
    };
    //取消收藏题目
    const cancelStar = (id: string) => {
      cancelStarProblem({
        id: id,
      }).then((res) => {
        if (res.stat === "ok") {
          ElMessage({
            message: "取消收藏题目成功",
            type: "success",
          });
          load();
        } else {
          ElMessage.error(res.msg);
        }
      });
    };
    //输入题目标题改变时
    const inputChange = (e: Event, index: number) => {
      const target = e.target as HTMLInputElement;
      cpnArray.value[index - 1].title = target.value;
    };
    //当题目设置改变时
    const settingChange = (setting: Isetting, index: number) => {
      cpnArray.value[index - 1].setting = JSON.parse(JSON.stringify(setting));
    };
    //挂载前加载数据
    onBeforeMount(async () => {
      await load();
    });

    let oldData = ref({} as Iproblem); // 开始排序时按住的旧数据

    let newData = ref({} as Iproblem); // 拖拽过程的数据

    //开始拖动元素时触发
    const dragstart = (value: Iproblem) => {
      oldData.value = value;
    };

    // 记录移动过程中信息
    const dragenter = (value: Iproblem, e: Event) => {
      newData.value = value;
      e.preventDefault();
    };

    // 拖动事件（主要是为了拖动时鼠标光标不变为禁止）
    const dragover = (e: Event) => {
      e.preventDefault();
    };

    // 拖拽最终操作
    const dragend = () => {
      if (oldData.value !== newData.value) {
        let oldIndex = cpnArray.value.indexOf(oldData.value);
        let newIndex = cpnArray.value.indexOf(newData.value);
        let newItems = [...cpnArray.value];
        // 删除老的节点
        newItems.splice(oldIndex, 1);
        // 在列表中目标位置增加新的节点
        newItems.splice(newIndex, 0, oldData.value);
        cpnArray.value = [...newItems];
      }
    };
    // 验证表单
    const validateForm = (): boolean => {
      if (cpnArray.value.length === 0) {
        ElMessage.error("请添加题目");
        return false;
      }
      if (formTitle.value === "") {
        ElMessage.error("请输入表单标题");
        return false;
      }
      if (formSubtitle.value === "") {
        ElMessage.error("请输入表单副标题");
        return false;
      }
      return true;
    };
    // 预览:将题目数据存入sessionStorage
    const preview = () => {
      if (!validateForm()) return;
      sessionStorage.setItem("cpnArray", JSON.stringify(cpnArray.value));
      sessionStorage.setItem("formTitle", formTitle.value as string);
      sessionStorage.setItem("formSubtitle", formSubtitle.value as string);
      router.push({
        path: "/preview",
        name: "预览",
      });
    };
    //保存草稿
    const saveDrafts = async () => {
      if (!validateForm()) return;
      const formData: Icreate = {
        title: formTitle.value as string,
        subTitle: formSubtitle.value as string,
        problems: cpnArray.value as Iproblem[],
      };
      const res = await create(formData);
      if (res.stat === "ok") {
        ElMessage({
          message: "保存草稿成功",
          type: "success",
        });
      } else {
        ElMessage.error(res.msg);
      }
    };

    //创建表单
    const id = ref(route.query.id as string);
    const status = ref(route.query.status as string);
    const createForm = async () => {
      if (!validateForm()) return;
      // 如果为草稿状态则直接发布，否则先创建表单在发布
      if (status.value === "2") {
        const result = await startCollecting({
          id: id.value,
        });
        if (result.stat === "ok") {
          ElMessage({
            message: "创建表单成功",
            type: "success",
          });
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
            id: id.value,
          },
        });
      } else {
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
      }
    };

    return {
      addProblem,
      cancelStar,
      collectProblem,
      copyProblem,
      cpnArray,
      createForm,
      deleteProblem,
      dragend,
      dragenter,
      dragover,
      dragstart,
      formSubtitle,
      formTitle,
      inputChange,
      preview,
      saveDrafts,
      settingChange,
      state,
      undeveloped,
    };
  },
});
</script>
<style scoped>
.new-form-view {
  display: flex;
  justify-content: center;
  gap: 20px;
  background-color: #f2f4f7;
  min-width: 1260px;
  padding: 10px;
}

.left {
  position: sticky;
  top: 95px;
  width: 200px;
  height: 600px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.right {
  position: sticky;
  top: 95px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 5px;
  padding: 10px;
  height: 100px;
  width: 200px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-width: 800px;
  min-height: 800px;
  margin: 10px 0;
  padding-bottom: 100px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.left-title {
  margin: 10px;
}

.btn-container {
  margin: 0 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 5px;
}

.type-btn {
  margin: 5px 0;
  border-radius: 2px;
  width: calc(50% - 5px);
  height: 28px;
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

.form-title:focus {
  outline: none;
}

.form-subtitle {
  margin: 10px 0;
  width: 100%;
  height: 36px;
  font-size: 18px;
  text-align: center;
  border: none;
}

.form-subtitle:focus {
  outline: none;
}

.problem-item {
  margin: 10px 0;
  padding: 20px;
  width: 700px;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0);
}

.problem-item:focus {
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
}

.preview-btn {
  height: 28px;
  margin: 5px 0;
  width: calc(50% - 5px);
}

.save-btn {
  height: 28px;
  margin: 5px 0;
  width: calc(50% - 5px);
}

.submit-btn {
  height: 28px;
  margin: 5px 0;
  width: 100%;
}

.problem-item :deep() .functional-item {
  height: 20px;
}

.problem-item :deep() .functional-button {
  height: 24px;
  width: 48px;
}

.problem-item :deep() .functional-icon {
  cursor: pointer;
}

.problem-item :deep() .functional-checkbox {
  margin: 0;
}
</style>
