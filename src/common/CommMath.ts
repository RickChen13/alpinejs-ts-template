/**
 * need add mathjs
 * @example https://mathjs.org/docs/core/configuration.html
 */
import { create, all } from "mathjs";

class CommMath {
  math = create(all, {});

  constructor() {
    this.math.config({
      epsilon: 1e-12,
      matrix: "Matrix",
      number: "BigNumber",
      precision: 64,
      predictable: false,
      randomSeed: null,
    });
  }

  /**
   * mathjs配置
   *
   * @param config
   * @returns
   */
  setConfig(config: math.ConfigOptions) {
    this.math.config(config);
    return this;
  }

  /**
   * 获取mathjs实例
   *
   * @defaultConfig see constructor()
   * @returns math.MathJsStatic
   */
  getMathJs(): math.MathJsStatic {
    return this.math;
  }

  /**
   * 计算表达式
   *
   * @param expression
   * @example CommMath.evaluate("0.1 + 0.9") // 1
   * @returns string
   */
  evaluate(expression: string): string {
    return this.math.evaluate(expression).toString();
  }
}
export default CommMath;
