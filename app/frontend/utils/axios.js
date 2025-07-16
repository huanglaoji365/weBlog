import axios from "axios";
import qs from "qs";
import { ElMessageBox, ElLoading } from "element-plus";

let loadingInstance = null; // 全局 loading 实例

const instance = axios.create({
    baseURL: "https://www.liuzepeng.com/api",
    timeout: 30000,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 显示 loading
        loadingInstance = ElLoading.service({
            lock: true,
            text: "加载中...",
            background: "rgba(0, 0, 0, 0.5)",
        });
        return config;
    },
    (error) => {
        if (loadingInstance) loadingInstance.close();
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        if (loadingInstance) loadingInstance.close();
        return response.data;
    },
    (error) => {
        if (loadingInstance) loadingInstance.close();

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

// 封装请求方法
const http = {
    get(url, params) {
        return instance.get(url, { params });
    },
    post(url, data) {
        return instance.post(url, qs.stringify(data));
    },
};

export default http;
