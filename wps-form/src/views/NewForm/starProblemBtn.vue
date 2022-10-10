<template>
  <el-popover
    trigger="contextmenu"
    v-model:visible="deleteVisible"
    placement="top"
    :width="160"
  >
    <p style="font-size: 12px">你确定要删除该常用题吗？</p>
    <div style="text-align: right; margin: 0">
      <el-button size="small" @click="deleteVisible = false">取消</el-button>
      <el-button size="small" type="primary" @click="onDelete"> 确定</el-button>
    </div>
    <template #reference>
      <el-button
        class="type-btn"
        @click="onClick"
        @contextmenu.prevent.stop="deleteVisible = true"
      >
        <slot></slot>
      </el-button>
    </template>
  </el-popover>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "starProblemBtn",
  setup(props, ctx) {
    const deleteVisible = ref(false);
    const onDelete = () => {
      ctx.emit("onDelete");
      deleteVisible.value = false;
    };
    const onClick = () => {
      ctx.emit("onClick");
    };
    return {
      deleteVisible,
      onDelete,
      onClick,
    };
  },
});
</script>
<style scoped>
.type-btn {
  margin: 5px 0;
  border-radius: 2px;
  width: calc(50% - 5px);
  height: 28px;
}
</style>
