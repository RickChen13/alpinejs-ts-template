import ApiConfig from "@/config/api";

abstract class BaseBll {
  /**
   * 构造函数
   */
  constructor() {}

  /**
   * url处理
   *
   * @param url
   */
  reqUrl(url: string) {
    const requestUrl = `${ApiConfig.hostUrl}${url}`;
    return requestUrl;
  }

  /**
   * 请求前对发送的数据进行处理
   *
   * @param data
   */
  reqSetData(data: any) {
    return data;
  }
}

export default BaseBll;
