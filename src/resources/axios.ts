import axios, { AxiosRequestConfig, Method, AxiosInstance, AxiosResponse } from "axios";
import { ElLoading, ElMessage } from "element-plus";
import any = jasmine.any;

let loadings: any;
//定义接口
interface PendingType {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: Function;
}

interface SettingType extends AxiosRequestConfig {
  loading?: boolean | undefined;
}

interface ResultsType {
  code?: number | string;
  errorCode?: number | string;
  message?: string;
  data: any;
}

//取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;
// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key;
    const list: PendingType = pending[key];
    // 当前请求在数组中存在时执行函数体
    if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试');
      // 从数组中移除记录
      pending.splice(item, 1);
    }
  }
};

function setInterceptors(axiosIns: AxiosInstance, loading = true) {
  axiosIns.interceptors.request.use(
    req => {
      // loading
      if (loading) {
        loadings = ElLoading.service({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
          fullscreen: true
        });
      }
      removePending(req);
      req.cancelToken = new CancelToken((c) => {
        pending.push({ url: req.url, method: req.method, params: req.params, data: req.data, cancel: c });
      });
      return req;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
  axiosIns.interceptors.response.use(
    (res: AxiosResponse) => {
      loadings.close && loadings.close();
      removePending(res.config);
      const errorCode = res?.data?.errorCode;
      const {data} = res;
      switch (errorCode) {
        case "401":
          // 根据errorCode，对业务做异常处理(和后端约定)
          ElMessage({
            message: "未登录",
            type: "error",
            duration: 2000
          });
          break;
        case "403":
          ElMessage({
            message: "您没有此操作权限，请联系管理员开通。",
            type: "error",
            duration: 2000
          });
          break;
        default:
          break;
      }
      return data;
    },
    (error: any) => {
      loadings.close && loadings.close();
      ElMessage({
        message: error.message,
        type: "success",
        duration: 5000
      });
      return Promise.reject(error);
    }
  );
}
/**
 * axios实例
 * @param setting
 * @param timeout
 */
const axiosIns = (setting: SettingType, timeout = 10000) => {
  const { loading } = setting;
  const ins: AxiosInstance = axios.create(setting);
  ins.defaults.timeout = timeout;
  ins.defaults.method = "GET";
  ins.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
  ins.defaults.headers.put["Content-Type"] = "application/json;charset=utf-8";
  setInterceptors(ins, loading);
  return ins;
};

export default axiosIns;
