import store from "@/store";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/Home/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "金山表单",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login/LoginView.vue"),
  },
  {
    path: "/newform",
    name: "新建",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/NewForm/NewFormView.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/NotFound/NotFoundView.vue"
      ),
  },
  {
    path: "/usercenter",
    name: "个人中心",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/User/UserCenterView.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/preview",
    name: "预览",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Preview/Preview.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/create/:id",
    name: "分享",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Share/ShareView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/statistics/:id",
    name: "数据统计&分析",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Statistics/StatisticsView.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/formproblem/:id",
    name: "表单问题",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/FormProblem/FormProblemView.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/fillform/:id",
    name: "填写表单",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/FillForm/FillFormView.vue"
      ),
  },
  {
    path: "/userinfo",
    name: "用户信息",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/User/UserInfoView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const Username = store.getters.getUsername;
  // 判断当前url是否要求验证
  if (to.matched.some((r) => r.meta.requiresAuth)) {
    // 判断用户是否登陆，以及是否记录用户信息
    if (Username === null) {
      // 跳转到登录界面
      next("/login");
    } else {
      // 保留在当前url
      next();
    }
  } else {
    next();
  }
});

export default router;
