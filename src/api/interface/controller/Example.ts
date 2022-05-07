/**
 * 获取arrayList参数
 *
 * data: any 请求数据--详情请参考结构体定义
 *
 * method?: string 请求方法
 *
 * chain?: boolean 是否链式返回
 *
 * success?: Function 非链式时，请求成功回调函数
 *
 * error?: Function 非链式时，请求失败回调函数
 */
export interface GetArrayList {
  data: {
    page: number;
  };
  method?: string;
  chain?: boolean;
  success?: Function;
  error?: Function;
}
