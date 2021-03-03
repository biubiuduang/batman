import axios, { AxiosRequestConfig, Method, AxiosInstance } from "axios";
import { ElLoading, ElMessage } from "element-plus";

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
  loading?: boolean | undefined,
}

//取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;
/**
 * axios实例
 * @param setting
 * @param timeout
 */
const axiosIns = (setting: SettingType, timeout = 10000) => {
  let ins: AxiosInstance;
  const { loading } = setting;
  ins = axios.create(setting);
  ins.defaults.timeout = timeout;
  ins.defaults.method = "GET";
  ins.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
  ins.defaults.headers.put["Content-Type"] = "application/json;charset=utf-8";
  setInterceptors(ins, loading);
  return ins;
};

function setInterceptors (axiosIns: any, loading = true) {
  axiosIns.interceptors.request.use(
    (req: any) => {
      // loading
      if (loading) {
        loadings = ElLoading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        });
      }
      return req
    },
    (error: any) => {
      return Promise.reject(error)
    }
  );
  axiosIns.interceptors.response.use(
    (res: any) => {
      loadings.close && loadings.close();
      const errorCode = res?.data?.errorCode;
      switch (errorCode) {
        case "401":
          // 根据errorCode，对业务做异常处理(和后端约定)
          ElMessage({
            message: '未登录',
            type: 'error',
            duration: 2000
          });
          break;
        case "403":
          ElMessage({
            message: '您没有此操作权限，请联系管理员开通。',
            type: 'error',
            duration: 2000
          });
          break;
        default:
          break;
      }
      return res;
    },
    (error: any) => {
      loadings.close && loadings.close();
      ElMessage({
        message: error.message,
        type: 'success',
        duration: 5000
      });
      return Promise.reject(error)
    }
  );
}

export default axiosIns;
