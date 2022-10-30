import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueClipboard from "vue-clipboard2";

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(VueClipboard);
app.mount("#app");
