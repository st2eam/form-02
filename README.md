# 02组大作业：

## 一、模块划分

### 代码结构(src)
```
├─assets
│  ├─image
│  └─styles
├─components
│  ├─formHeader
│  ├─formNav
│  └─problemFilling
├─router
├─services
├─store
├─utils
└─views
    ├─FillForm
    ├─FormProblem
    ├─Home
    ├─Login
    ├─NewForm
    │  └─problemGenerated
    ├─NotFound
    ├─Preview
    ├─Share
    ├─Statistics
    │  └─problemResult
    └─User
```
### 功能划分

- 用户模块（登陆、注册、个人中心页面）  
  注册、登录、退出、设置用户信息、获取用户信息、修改密码

- 表单模块  
  创建表单、填写表单、获取表单填写详情、获取表单单个填写详情、开始收集表单、结束收集表单
  
- 问题模块  
  获取基础题目类型、获取基础题目、收藏、取消收藏、获取收藏列表

- 首页模块  
  获取表单列表、获取表单、删除表单、表单标星、表单取消标星

## 二、小组分工
- 用户模块（解伟、龚建全）
- 表单模块（黄世隽、陈嘉泽）
- 问题模块（张鹏）
- 首页模块（王志佳）

## 三、项目说明
0. 使用方式：先通过`git clone https://git.kscampus.io:10443/form-front-web/02.git`命令下载项目，然后进入项目目录，运行`npm install`命令安装依赖，运行`npm run serve`命令运行；然后使用同样的方式运行后台服务，最后打开相应网址即可。  
>  注意：若项目出现警告 `warning Delete `␍` prettier/prettier` ,该问题是由于使用windows系统下的git克隆代码时，会自动把换行符LF 转换成回车符CRLF，这时需要运行 `npm run lint --fix` 命令修复；然后最好运行 `git config --global core.autocrlf false` 命令防止以后还会自动转换，这样项目就能正常运行了。  

1. 大作业原型示例：[https://f.wps.cn/form-list](https://f.wps.cn/form-list)
2. 后台服务仓库地址：[https://git.kscampus.io:10443/web-2022/form-server.git](https://git.kscampus.io:10443/web-2022/form-server.git)，阅读该仓库的README.md文件，查看大作业说明
3. 原型图： [https://modao.cc/app/ZlAsY7aErb1kbbQZFPMz5 ](https://modao.cc/app/ZlAsY7aErb1kbbQZFPMz5 )
4. api 以及 types 已经写好，各位自行调用即可，如有bug请及时反馈。

### 技术选型

- Vue3
- TypeScript
- Router——页面导航
- Vuex——状态管理模式 + 库
- Eslint——插件化的javascript代码检测工具。
- [Element Plus](https://element-plus.gitee.io/zh-CN/component/button.html)——UI组件库
- qrcode.vue——字符串转为二维码的第三方库
- vue-clipboard——字符串复制到剪切板的第三方库

### 运行说明

```bash
$ npm i
$ npm run serve
```
## 四、每周(日)进度
### 2022/05/23-2022/05/29
#### 2022/05/23
- 黄世隽: 完成项目创建、安装Element Plus依赖

#### 2022/05/24
- 黄世隽: 提供api请求接口，提供types，编写首页

#### 2022/05/25
- 黄世隽: 编写新建表单页面，实现点击按钮添加题目以及自动聚焦的功能

#### 2022/05/26
- 黄世隽: 新增登陆注册界面，使用Vuex+sessionStorage实现登陆验证
- 龚建全：新增首页头像的下拉菜单、个人中心页面框架

#### 2022/05/27
- 龚建全：新增修改真实姓名、修改密码功能
- 黄世隽：增加题目下功能按钮,完善题目聚焦功能,编写上传图片部分功能。

#### 2022/05/28
- 黄世隽：增加收藏题目，修复input信号以及传参问题
- 王志佳：编写首页基本页面框架
- 龚建全：实现上传头像、修改真实姓名时首页信息同步更新

#### 2022/05/29
- 龚建全：新增创建表单的时间题、日期题、打分题类型的组件，修复一些 warning
- 黄世隽：新增选择题组件，修改之前的一些样式

### 2022/05/30-2022/06/06

#### 2022/05/30
- 黄世隽：新增下拉选择题，增加题目拖动排序功能，修复一些 bug
- 龚建全：修复登录界面默认会请求用户信息的 bug

#### 2022/05/31
- 龚建全：新增填写详情-数据统计/问题/分享页面框架及路由导航，使用qrcode.vue，vue-clipboard组件实现分享页面中二维码生成、下载、复制链接等功能
- 黄世隽：新增填写表单所有题目组件以及首页获取表单列表，实现表单预览功能

#### 2022/06/01
- 王志佳：修改表单创建时间及状态显示效果
- 陈嘉泽：修复一些表单预览页面的 bug
- 黄世隽：修复并完善创建页面后页面逻辑，修改部分页面样式，增加除多选题以外的表单题目填写功能，以及表单提交功能。
- 龚建全：完善填写详情-问题页面样式，新增跳转填写表单链接及路由，并根据问题页面初步搭建填写表单页面框架

#### 2022/06/02
- 王志佳：首页新增表单标星、表单取消标星、表单分享、查看表单结果、表单编辑、删除表单功能，新增相应样式
- 陈嘉泽：调整部分表单预览页面样式
- 黄世隽：增加多选题的表单题目填写功能，修改提交表单选择题部分bug，增加筛选标星表单功能以及页面，完善首页表单状态分类以及对应功能，增加新建表单的保存草稿功能，增加统计页面所有题目结果展示组件
- 龚建全：新增填写详情-数据统计页面，通过对所有表单组件添加 props 属性动态渲染出不同填写者的表单数据，减少编写新的组件。

#### 2022/06/03
- 龚建全：新增 Arrow 图标替换上下页按钮，调整表单详情各页面样式、首页样式、导航栏昵称展示。
- 黄世隽：
  - 增加首页分页器
  - 解决数据统计页器阈值问题
  - 显示数据统计页面未填写情况
  - 修正二维码复制链接以及二维码表单名称
  - 预览以及提交时表单校验
  - 增加时间以及日期选择器value的格式化
  - 对除了填写表单的页面的其他页面增加路由守卫
  - 优化数据类型结构
  - 删除无用界面

#### 2022/06/04
- 龚建全：新增个人中心的个人信息查询功能及页面，用户ID的显示等，调整了部分样式。
- 黄世隽：修复个人中心默认头像显示错误，解决登录表单需重复提交的问题。

#### 2022/06/05
- 黄世隽：封装防抖节流功能，提交按钮添加节流限制,增加填写表单完成后界面
- 龚建全：调整部分页面样式，以及修复部分 warning 提示。

#### 2022/06/06
- 王志佳：修复表头头像及昵称显示异常，调整首页样式。

## 五、问题与解决方法
### 1. 如何利用git进行协作开发

先把最新的项目代码克隆到本地

```shell
git clone https://git.kscampus.io:10443/form-front-web/02.git
```

我们在本地建立 a 分支，在项目文件夹下执行：

```shell
cd/02
git checkout -b a //分支名称a只是举个例子，不要都用a
```

编写完以后，我们要提交代码到远程的a分支，我们按顺序执行以下代码

```shell
// 将项目的代码变化提交到缓存区（包括修改、添加和删除）
git add -A

// 将缓存区的所有内容提交到当前本地分支，并附上提交说明：'xxx'
git commit -m 'xxx'

// 将代码提交到远程a分支
git push origin a
```

如果a模块已经编写完毕，而且经过测试无bug，那么，我们可以把远程 a 分支合并到远程的 master 分支。

不过，在合并之前，我们需要确认当前的 a 分支是从最新的 master 分支牵出来的。

1. 如果从你克隆项目到本地到你准备合并 a 分支的这个过程中都没有人提交过代码到 master 分支，那么你可以在 Git 上发起 “和并请求” 请求将 a 分支的代码合并到 master 分支。

   ![image](./images/img-1.png)



2. 如果从你克隆项目到本地到你准备合并 a 分支的这个过程中有人提交过代码到 master 分支。那么，我们需要先将本地项目切回 master 分支：

```shell
git checkout master
```

将最新的远程 master 分支代码拉到本地的 master 分支：

```shell
git pull origin master
```

切换到本地 a 分支：

```shell
git checkout a
```

将本地 master 分支合并到当前分支：

```shell
git merge master
```

如果合并的过程中有冲突，那么我们可以借助 vscode 去查看冲突的代码并选择我们需要保留的代码。

合并好了以后，我们需要将本地的 a 分支代码更新到远程 a 分支：

```shell
git add -A

git commit -m "xxx"

git push origin a
```

这样远程的 a 分支代码就不会比远程的 master 代码落后了，这样我们就可以提合并请求了。
   ![image](./images/img-2.png)

   ![image](./images/img-3.png)

**后面就是同意你的合并请求就行了**

### 2. 登录时，偶尔会遇到状态码是200，后端正常响应，却没有响应数据的情况

#### 相关代码
前端代码

api:

```ts
// 登录
export function login(body: Ilogin) {
  return request.post<Ires>("/api/auth/login", body);
}
```

主要代码：

```ts
    const onLogin = async () => {
      if (state.loginbody.account === "") {
        ElMessage.error("请输入用户名");
        return;
      }
      if (state.loginbody.pwd === "") {
        ElMessage.error("请输入密码");
        return;
      }
      const res = await login(state.loginbody);
      if (res.stat === "ok") {
        ElMessage({
          message: "登录成功",
          type: "success",
        });
        store.commit("setUsername", state.loginbody.account);
        router.push("/");
      } else {
        ElMessage.error(res.msg);
      }
    };
```
后端代码
```ts
router.post("/login", checkBody(checkLoginBody), async (ctx: Context) => {
  try {
    const { account, pwd } = ctx.request.body as IRegisterReq;
    const token = await userKit.login(account, pwd);
    ctx.cookies.set("token", token);
    ctx.body = generateOk();
  } catch (err) {
    catchError(err, ctx);
  }
});
```
#### 尝试过哪些方法去解决
分别在前后端进行调试

后端没有抛出错误，正常输出：

```
2022/6/5 01:46:13 login success:  stream 123456
path: /api/auth/login
2022/6/5 01:48:26 login success:  admin 123456
path: /api/auth/login
2022/6/5 01:48:33 login success:  admin 123456
path: /api/auth/login
2022/6/5 01:48:39 login success:  admin 123456
```

前端chrome中的请求结果：

可以看到只有第四次登录成功时响应数据才有大小

![image-20220605020407192](./images/image-20220605020407192.png)

而且经过测试登陆不成功的时候控制台也没有输出，因此问题可以定位到await这里。

```ts
const res = await login(state.loginbody);
console.log(new Date().toString(), res);//控制台输出
if (res.stat === "ok") {···}
```

初步判断也许是服务端发送了空字符串导致的问题。

后面经过仔细观察发现，提交时页面会有一次刷新，因此换一个角度思考：可能是逻辑部分代码和原来表单的提交有冲突，在前端发送请求等待响应的时候表单提交导致页面已经刷新，因此尝试阻止原生表单的提交事件。

```html
<form onsubmit="return false;">
```

经过多次登录测试，没出现问题了。