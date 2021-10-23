import Vue from "vue";
import { Checkbox, Dialog, Button } from "element-ui";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/base.css";
import "mdn-polyfills/HTMLCanvasElement.prototype.toBlob";

Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(Button);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
