import { Message } from '@arco-design/web-react';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
// import { clearToken, getToken } from '@/utils/auth';
// import { useUserStore } from '@/store';

export interface HttpResponse<T = unknown> {
  status: number;
  message: string;
  code: number;
  success: boolean;
  data: T;
}

axios.defaults.baseURL = '/api/';
axios.defaults.timeout = 80000;
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 为请求设置token
    // const token = getToken();
    if (!config.headers) {
      config.headers = {};
    }
    // config.headers.Authorization = `${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    // if (!res.success) {
    //   Message.error({
    //     content: res.message || 'Error',
    //     duration: 5 * 1000,
    //   });
    //   return Promise.reject(new Error(res.message || 'Error'));
    // }
    return res;
  },
  async (error) => {
    // if ([401].includes(error.response?.status)) {
    //   const userStore = useUserStore();
    //   userStore.resetInfo();
    //   clearToken();
    //   if (window.location.href !== `${window.location.origin}/#/index`) {
    //     window.open(`${window.location.origin}/#/index`, '_self');
    //     Modal.error({
    //       title: '登录过期',
    //       content: '登录已过期，请重新登录',
    //       okText: '确定',
    //     });
    //   }
    // }
    // if ([402].includes(error.response?.status)) {
    //   Modal.error({
    //     title: '额度不足',
    //     content: '您的额度不足，可以开通会员后使用',
    //     okText: '充值',
    //     async onOk() {
    //       window.open(`${window.location.origin}/#/member-center`);
    //     },
    //   });
    // }
    if ([500].includes(error.response?.status)) {
      Message.error({
        content: error.response?.data?.message || '请求错误',
        duration: 5 * 1000,
      });
    }
    return Promise.reject(error);
  }
);
