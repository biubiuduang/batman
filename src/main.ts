/*
 * @Description: main.ts
 * @Author: King
 * @Date: 2021-02-23 17:13:49
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios, { AxiosInstance } from "axios";

require("../mock");

const app = createApp(App);

import { installElementPlus } from "./plugins";

installElementPlus(app);
//全局配置Axios
app.config.globalProperties.$axios = Axios;

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

app
  .use(store)
  .use(router)
  .mount("#app");
