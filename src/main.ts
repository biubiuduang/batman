/*
 * @Description: main.ts
 * @Author: King
 * @Date: 2021-02-23 17:13:49
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

import { installElementPlus } from "./plugins";

installElementPlus(app);

app
  .use(store)
  .use(router)
  .mount("#app");
