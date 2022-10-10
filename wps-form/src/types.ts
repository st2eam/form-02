/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Iregister {
  account: string;
  pwd: string;
  confirmPwd: string;
}

export interface Ilogin {
  account: string;
  pwd: string;
}

export interface Iuser {
  nickname: string;
  avatar: string;
  userid: string;
  ctime: number;
  utime: number;
  account: string;
  status: number;
}

export interface Ipassword {
  oldPwd: string;
  pwd: string;
  confirmPwd: string;
}

export interface Ilist {
  offset?: number;
  limit?: number;
  isStar?: boolean;
}

export interface Icreate {
  title: string;
  subTitle: string;
  problems: Iproblem[];
}

export interface IformData {
  formId: string;
  problems: {
    id: string;
    title: string;
    type: string;
    required: boolean;
    setting?: {
      options: {
        title: string;
        status: 1 | 2;
      }[];
    };
    result?:
      | string
      | number
      | {
          id: string;
          title: string;
        }
      | {
          id: string;
          title: string;
        }[];
  }[];
}

export interface Iproblem {
  id?: string;
  title: string;
  required: boolean;
  type?: string;
  setting?: {
    options: {
      title: string;
      status: 1 | 2;
    }[];
  };
}

export interface Isetting {
  options: {
    title: string;
    status: 1 | 2;
  }[];
}

export interface IproblemData {
  problem: Iproblem;
}

export interface Ires {
  stat: string;
  msg?: string;
  data?: any;
}
