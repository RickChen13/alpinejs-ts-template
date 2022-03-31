import App from "@/common/app";
import xdata from "@/alpine/xdata";
import template from "@/template/index.html";

import "@/scss/index.scss";

const app = new App();

app
  .mount(template)
  .alpinejs({
    name: "xData",
    func: xdata,
  })
  .start("app");
