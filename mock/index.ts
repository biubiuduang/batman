/*
 * @Description: 注册mock服务
 * @Author: King
 * @Date: 2021-02-24 16:45:23
 */
//引入mock
import Mock from "mockjs";
// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: "200-600"
});
//设置 domain层地址
const domain = "https://www.domain.com/api";
let configArray: Array<any> = [];
//使用webpack的require.context()遍历所有mock文件
const files = require.context("./data", true, /\.ts$/);

files.keys().forEach(key => {
  if (key === "./index.ts") return;
  configArray = configArray.concat(files(key).default);
});

//注册所有的mock服务
configArray.forEach(item => {
  // item.method 必须为小写！！！
  Mock.mock(`${domain}${item.url}`, item.method.toLowerCase(), item.response);
});
