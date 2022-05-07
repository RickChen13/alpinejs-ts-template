import BaseController from "@/api/base/BaseController";
import ExampleBll from "@/api/bll/ExampleBll";
import { GetArrayList } from "@/api/interface/controller/Example";

class ExampleController extends BaseController {
  /**
   * 逻辑处理层
   */
  bll: ExampleBll;

  constructor() {
    super();
    this.bll = new ExampleBll();
  }

  /**
   * 获取arrayList
   *
   * @param config
   */
  async getArrayList(config: GetArrayList) {
    const url = "/api/test/getArrayList";
    const reqConfig = this.fastSetReqConfig(this.bll.reqUrl(url), config);
    if (config.chain == true) {
      return new Promise((resolve) => {
        resolve(this.chain(reqConfig));
      });
    } else {
      this.callBlack(reqConfig);
    }
  }
}

export default ExampleController;
