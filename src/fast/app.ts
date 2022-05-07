import Alpine from "alpinejs";

declare interface Argv {
  /**
   * need string
   */
  name: any;
  /**
   * need Function
   */
  func: any;
}

declare interface WindowValue {
  name: any;
  value: any;
}

const getComponent = (html: string, id: string = "") => {
  let element = document.getElementById(id);
  if (element == null) {
    element = document.createElement("div");
    element.setAttribute("id", id);
  }
  element.innerHTML = html;
  return element;
};

class App {
  private html: string = "";
  private alpine: boolean = false;

  constructor() {}

  /**
   * 挂载html
   *
   * @param args
   * @returns
   */
  mount(...args: string[]) {
    for (let index = 0; index < args.length; index++) {
      const element = args[index];
      this.html += element;
    }
    return this;
  }

  /**
   * 挂载alpine函数
   *
   * @param argv
   * @returns
   */
  alpinejs(...argv: Argv[]) {
    this.alpine = true;
    for (let index = 0; index < argv.length; index++) {
      const element = argv[index];
      this.setWindowValue({
        name: element.name,
        value: element.func,
      });
    }
    return this;
  }

  setWindowValue(...argv: WindowValue[]) {
    this.alpine = true;
    for (let index = 0; index < argv.length; index++) {
      const element = argv[index];
      window[element.name] = element.value;
    }
    return this;
  }

  /**
   * 开始执行
   *
   * @param id
   */
  start(id: string) {
    let component = getComponent(this.html, id);
    document.body.appendChild(component);
    if (this.alpine == true) {
      Alpine.start();
    }
    return this;
  }

  /**
   * 执行函数
   *
   * @param func
   * @param args
   * @returns
   */
  run(func: Function, ...args: any) {
    func(...args);
    return this;
  }
}
export default App;
