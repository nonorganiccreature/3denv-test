import { createApp } from "vue";
import { GameApplication } from "./assets/game";

import "./assets/styles/scss/main.scss";
import App from "./App.vue";

const app = createApp(App);
const gameApp = new GameApplication();

app.provide("gameApplication", gameApp);
app.mount("#app");
