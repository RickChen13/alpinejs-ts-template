import App from "@/fast/app";
import example from "@/app/alpine/example";
import template from "@/controller/template/index.html";

import "@/controller/style/index.scss";

const app = new App();

app
  .mount(template)
  .alpinejs({
    name: "example",
    func: example,
  })
  .start("app");
