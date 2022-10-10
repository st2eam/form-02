<template>
  <div class="home">
    <el-container>
      <!-- 侧栏 -->
      <el-aside class="aside">
        <router-link to="/newform">
          <el-button type="primary" class="new-form-btn shadow" icon="Plus">
            新建
          </el-button>
        </router-link>
        <el-menu class="menu" default-active="1" background-color="#f2f5fa">
          <el-menu-item class="shadow" index="1">
            <el-icon><List /></el-icon>
            <span>表单列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 表单列表 -->
      <div class="container">
        <div class="filter">
          <div v-if="isFilter" @click="isFilter = !isFilter">
            <el-icon>
              <Star />
            </el-icon>
            <span> 展示全部 </span>
          </div>
          <div v-else @click="isFilter = !isFilter">
            <el-icon color="orange" size="large">
              <StarFilled />
            </el-icon>
            <span> 仅展示星标 </span>
          </div>
        </div>
        <el-main class="main">
          <el-table
            :data="
              isFilter ? listItems.filter((item) => item.isStar) : listItems
            "
            style="width: 100%"
          >
            <template #empty>
              <div class="empty">
                <img
                  class="empty-img"
                  src="data:image/png;base64,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"
                />
                <p>暂无星标表单</p>
              </div>
            </template>
            <!-- 表单名称 -->
            <el-table-column label="表单名称" align="center">
              <template #default="scope">
                <div class="test">
                  <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </div>
              </template>
            </el-table-column>
            <!-- 创建时间 -->
            <el-table-column label="创建时间" align="center">
              <template #default="scope">
                <div class="test">
                  <span style="margin-left: 10px">{{
                    timestampToTime(scope.row.ctime)
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <!-- 状态 -->
            <el-table-column label="状态" align="center">
              <template #default="scope">
                <div class="test">
                  {{ changeStatus(scope.row.status) }}
                </div>
              </template>
            </el-table-column>
            <!-- 标星 -->
            <el-table-column label="" align="center">
              <template #default="scope">
                <div class="test">
                  <el-icon v-if="!scope.row.isStar">
                    <Star
                      style="cursor: pointer"
                      @click="StarClick(scope.row)"
                    ></Star>
                  </el-icon>
                  <el-icon v-else color="orange" size="large">
                    <StarFilled
                      style="cursor: pointer"
                      @click="StarClick(scope.row)"
                    ></StarFilled>
                  </el-icon>
                </div>
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" align="right" header-align="center">
              <template #default="scope">
                <el-button
                  class="button"
                  v-if="scope.row.status === 2"
                  @click="Publish(scope.row.id)"
                  >发布</el-button
                >
                <el-button
                  class="button"
                  v-if="scope.row.status === 3"
                  @click="Share(scope.row.id)"
                  >分享</el-button
                >
                <el-button
                  class="button"
                  v-if="scope.row.status === 3 || scope.row.status === 4"
                  @click="ViewResults(scope.row.id)"
                  >查看结果</el-button
                >
                <el-button
                  class="button"
                  v-if="scope.row.status === 2"
                  @click="editForm(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  class="button"
                  v-if="scope.row.status === 3"
                  @click="endCollectingForm(scope.row.id)"
                  >结束</el-button
                >
                <el-button
                  class="button"
                  type="danger"
                  @click="delFormItem(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-footer class="footer">
          <el-button @click="lastPage" :disabled="currentPage === 0"
            >上一页</el-button
          >
          <span class="current-page">{{ currentPage + 1 }}</span>
          <el-button @click="nextPage" :disabled="listItems.length < pageSize"
            >下一页</el-button
          >
        </el-footer>
      </div>
    </el-container>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, onBeforeMount, reactive, ref } from "vue";
import { Ilist } from "../../types";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import {
  list,
  delForm,
  starForm,
  cancelStarForm,
  startCollecting,
  endCollecting,
} from "../../services/api";
export default defineComponent({
  name: "HomeView",
  setup() {
    const router = useRouter();
    //是否筛选
    const isFilter = ref(false);
    const currentPage = ref(0);
    const pageSize = ref(12);
    const state = reactive({
      FormList: [] as Ilist,
    });
    const listItems = ref([]);
    //加载数据
    const load = async (offset: number, limit: number) => {
      state.FormList = {
        offset: offset,
        limit: limit,
      };
      const res = await list(state.FormList);
      if (res.stat === "ok") {
        listItems.value = res.data.items;
      }
    };
    //挂载前加载数据
    onBeforeMount(async () => {
      await load(0, pageSize.value);
    });
    //时间戳转换
    const timestampToTime = (timestamp: number) => {
      let date = new Date(timestamp);
      let Y = date.getFullYear() + "年";
      let M = date.getMonth() + 1 + "月";
      let D = date.getDate() + "日 ";
      let h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      let m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      return Y + M + D + h + m;
    };
    //表单状态转换
    const changeStatus = (status: number) => {
      switch (status) {
        case 1:
          return "已删除";
        case 2:
          return "草稿";
        case 3:
          return "收集中";
        case 4:
          return "已结束";
        default:
          return "未知";
      }
    };
    //表单标星
    const StarClick = (obj: any) => {
      if (!obj.isStar) {
        starForm({
          id: obj.id,
        });
      } else {
        cancelStarForm({
          id: obj.id,
        });
      }
      load(currentPage.value, pageSize.value);
    };
    //分享表单
    const Share = (id: string) => {
      router.push(`/create/${id}`);
    };
    //查看结果
    const ViewResults = (id: string) => {
      router.push({
        path: "/statistics/" + id,
      });
    };
    //编辑表单
    const editForm = (row: any) => {
      sessionStorage.setItem("cpnArray", JSON.stringify(row.problems));
      sessionStorage.setItem("formTitle", row.title as string);
      sessionStorage.setItem("formSubtitle", row.subTitle);
      router.push({
        path: "/newform",
        query: {
          id: row.id,
          status: row.status,
        },
      });
    };
    //删除表单
    const delFormItem = (id: string) => {
      delForm({ id: id }).then((res) => {
        if (res.stat === "ok") {
          ElMessage({
            message: "删除表单成功",
            type: "success",
          });
          load(currentPage.value, pageSize.value);
        } else {
          ElMessage.error(res.msg);
        }
      });
    };
    //结束收集表单
    const endCollectingForm = (id: string) => {
      endCollecting({ id: id }).then((res) => {
        if (res.stat === "ok") {
          ElMessage({
            message: "结束收集成功",
            type: "success",
          });
          load(currentPage.value, pageSize.value);
        } else {
          ElMessage.error(res.msg);
        }
      });
    };
    //发布表单
    const Publish = (id: string) => {
      startCollecting({ id: id }).then((res) => {
        if (res.stat === "ok") {
          ElMessage({
            message: "发布表单成功",
            type: "success",
          });
          load(currentPage.value, pageSize.value);
        } else {
          ElMessage.error(res.msg);
        }
      });
    };
    //上一页
    const lastPage = () => {
      currentPage.value--;
      load(currentPage.value, pageSize.value);
    };
    //下一页
    const nextPage = () => {
      currentPage.value++;
      load(currentPage.value, pageSize.value);
    };
    return {
      listItems,
      editForm,
      delFormItem,
      timestampToTime,
      changeStatus,
      endCollectingForm,
      StarClick,
      Share,
      ViewResults,
      isFilter,
      Publish,
      lastPage,
      nextPage,
      currentPage,
      pageSize,
    };
  },
});
</script>

<style scoped>
.button {
  height: 2em;
  border: none;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.shadow {
  background: #ffffff;
  box-shadow: 0 0 6px #b0b0b0;
}

.test {
  display: flex;
  justify-content: center;
  align-items: center;
}

.home {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.aside {
  width: 20%;
  height: 92vh;
  max-width: 230px;
  min-width: 167px;
  padding: 44px 16px 20px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.new-form-btn {
  height: 36px;
  width: 100%;
}

.menu {
  margin-top: 36px;
  border: none;
}

.filter {
  display: flex;
  justify-content: flex-end;
}

.filter div {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
  cursor: pointer;
}

.container {
  width: 100%;
  padding: 10px;
}

.main {
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0;
  margin: 10px;
}

.empty {
  text-align: center;
  margin-top: 50px;
}

.empty-img {
  width: 100px;
  height: 100px;
}

.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
}
.current-page {
  text-align: center;
  width: 50px;
  margin: 0 10px;
}
.footer .el-button {
  margin: 0 15px;
}
</style>
