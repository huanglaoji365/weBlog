import axios from "axios";
import qs from "qs";
import { ElMessageBox, ElLoading } from "element-plus";

let loadingInstance = null;
let loadingCount = 0;

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://www.liuzepeng.com/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
});

// 显示 loading
function showLoading() {
  if (loadingCount === 0) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: "加载中...",
      background: "rgba(0, 0, 0, 0.5)",
    });
  }
  loadingCount++;
}

// 关闭 loading
function closeLoading() {
  loadingCount--;
  loadingCount = Math.max(loadingCount, 0);
  if (loadingCount === 0 && loadingInstance) {
    loadingInstance.close();
    loadingInstance = null;
  }
}

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    showLoading();
    return config;
  },
  (error) => {
    closeLoading();
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    closeLoading();
    return response.data;
  },
  (error) => {
    closeLoading();
    ElMessageBox.alert(
      `<div style='color: #4f4fa9'>请联系：huanglaoji@111.com</div><div>${JSON.stringify(error)}</div>`,
      "请求异常",
      {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
      }
    );
    return Promise.reject(error);
  }
);

const http = {
  get(url, params) {
    return instance.get(url, { params });
  },
  post(url, data) {
    return instance.post(url, qs.stringify(data));
  },
};

export default http;