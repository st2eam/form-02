/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { ElMessage } from "element-plus";

/**
 * @des 防抖 ，多次只执行最后一次
 * @param func 需要包装的函数
 * @param delay 延迟时间，单位ms
 * @param immediate 是否默认执行一次(第一次不延迟)
 */
export class Debounced {
  public use = (func: Function, delay: number, immediate = false): Function => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      if (immediate) {
        func.apply(this, args);
        immediate = false;
        return;
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
}

/**
 * @des 节流，多次都会执行，只是间隔一段时间再执行
 * @param func 需要包装的函数
 * @param delay 延迟时间，单位ms
 * @param immediate 是否默认执行一次(第一次不延迟)
 */
export class Throttle {
  private timer: NodeJS.Timeout | undefined;
  private stop = false;
  private death = false;
  public use(func: Function, delay: number, immediate = false): Function {
    let flag = true;
    return (...args: any) => {
      if (this.death) {
        func.apply(this, args);
        return;
      }
      if (this.stop) {
        func.apply(this, args);
        return;
      }
      if (immediate) {
        func.apply(this, args);
        immediate = false;
        return;
      }
      if (!flag) {
        return;
      }
      flag = false;
      this.timer = setTimeout(() => {
        func.apply(this, args);
        flag = true;
      }, delay);
    };
  }

  // 销毁
  public destroy() {
    this.death = true;
    this.stop = true;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  // 开启
  public open() {
    if (!this.death) {
      this.stop = false;
    }
  }

  // 关闭
  public close() {
    this.stop = true;
  }
}

//未开发功能
export const undeveloped = () => {
  ElMessage("此功能未开发");
};
