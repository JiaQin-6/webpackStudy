//导入axios
import axios from "axios";
//创建多个基地址
let baseUrl = "";
switch (process.env.NODE_ENV) {
    case "development": // 注意这里的名字要和步骤二中设置的环境名字对应起来
        baseUrl = "http://localhost:3000/"; //这里是测试环境中的url http://43.154.184.138:8084
        break;
    case "production":
        baseUrl = "https://app.fairviewpark.hk"; //生产环境url
        break;
    default:
        baseUrl = "http://43.154.184.138:8084"; //这里是本地的请求url
}
export const http = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    timeout: 1800000, //数据响应过期时间
    headers: {
      // 设置后端需要的传参类型
      "Content-Type": "application/x-www-form-urlencoded",
    //   token: "your token",
    //   "X-Requested-With": "XMLHttpRequest",
    },
});
//登录
http.login = (arr) => {
    return http.post(`/login`, arr);
};
/* ---------------------------------------------------------------------- */
/* 请求拦截:在浏览器发送请求报文给服务器的途中执行 */
/* 在发送给服务器的时候带token给服务器 */
http.interceptors.request.use((config) => {
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
/* 响应拦截: 在服务器把响应报文发送给浏览器的途中执行 */
/* 登录后让服务器带给浏览器token */
http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
/* ----------------------------------------------------------------------- */
export default http;
