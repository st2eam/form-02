import * as request from "./request";
import {
  Iregister,
  Ilogin,
  Iuser,
  Ipassword,
  Ilist,
  Icreate,
  IformData,
  IproblemData,
  Ires,
} from "../types";

/*
    ___   __  __________  __
   /   | / / / /_  __/ / / /
  / /| |/ / / / / / / /_/ / 
 / ___ / /_/ / / / / __  /  
/_/  |_\____/ /_/ /_/ /_/   
                            
*/

// 注册
export function register(body: Iregister) {
  return request.post<Ires>("/api/auth/register", body);
}
// 登录
export function login(body: Ilogin) {
  return request.post<Ires>("/api/auth/login", body);
}
// 退出登录
export function logout() {
  return request.post<Ires>("/api/auth/logout");
}

/*
   __  _______ __________ 
  / / / / ___// ____/ __ \
 / / / /\__ \/ __/ / /_/ /
/ /_/ /___/ / /___/ _, _/ 
\____//____/_____/_/ |_|  
                          
*/

// 获取用户信息
export function getInfo() {
  return request.get<Ires>("/api/user/getInfo");
}
// 设置用户信息
export function setInfo(body: Iuser) {
  return request.post<Ires>("/api/user/setInfo", body);
}
// 修改密码
export function changePwd(body: Ipassword) {
  return request.post<Ires>("/api/user/changePwd", body);
}

/*
    __________  ____  __  ___
   / ____/ __ \/ __ \/  |/  /
  / /_  / / / / /_/ / /|_/ / 
 / __/ / /_/ / _, _/ /  / /  
/_/    \____/_/ |_/_/  /_/   
                             
*/
// 获取列表
export function list(body: Ilist) {
  return request.post<Ires>("/api/form/list", body);
}
// 创建表单
export function create(body: Icreate) {
  return request.post<Ires>("/api/form/create", body);
}
// 获取表单
export function getForm(body: { id: string }) {
  return request.post<Ires>("/api/form/get", body);
}
// 删除表单
export function delForm(body: { id: string }) {
  return request.post<Ires>("/api/form/delete", body);
}
// 表单标星
export function starForm(body: { id: string }) {
  return request.post<Ires>("/api/form/star", body);
}
// 表单取消标星
export function cancelStarForm(body: { id: string }) {
  return request.post<Ires>("/api/form/cancelStar", body);
}
// 填写表单
export function inputForm(body: IformData) {
  return request.post<Ires>("/api/form/input", body);
}
// 获取表单填写详情
export function formResult(formId: string) {
  return request.get<Ires>("/api/form/formResult/" + formId);
}
// 获取表单单个填写详情
export function detail(id: string) {
  return request.post<Ires>("/api/form/detail/" + id);
}
// 开始收集表单
export function startCollecting(body: { id: string }) {
  return request.post<Ires>("/api/form/start", body);
}
// 结束收集表单
export function endCollecting(body: { id: string }) {
  return request.post<Ires>("/api/form/end", body);
}
/*
     ____             __    __             
   / __ \_________  / /_  / /__  ____ ___ 
  / /_/ / ___/ __ \/ __ \/ / _ \/ __ `__ \
 / ____/ /  / /_/ / /_/ / /  __/ / / / / /
/_/   /_/   \____/_.___/_/\___/_/ /_/ /_/  
*/

// 获取基础题目类型
export function problemType() {
  return request.get<Ires>("/api/problem/listType");
}
// 获取基础题目
export function problemBasic() {
  return request.get<Ires>("/api/problem/listBasic");
}
// 获取收藏的题目
export function problemStar() {
  return request.post<Ires>("/api/problem/listStar");
}
// 收藏题目
export function starProblem(body: IproblemData) {
  return request.post<Ires>("/api/problem/star", body);
}
// 取消收藏题目
export function cancelStarProblem(body: { id: string }) {
  return request.post<Ires>("/api/problem/cancelStar", body);
}
