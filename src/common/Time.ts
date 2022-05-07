class Time {
  /**
   * 格式化时间
   *
   * @param time 时间戳
   * @param format 格式化
   * @returns
   */
  static format(time: number, format: string): string {
    let date = new Date(time);
    let year = String(date.getFullYear());
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let str = format;
    str = str.replace(/yyyy/gi, year);
    str = str.replace(/MM/g, month > 9 ? String(month) : "0" + String(month));
    str = str.replace(/dd/g, day > 9 ? String(day) : "0" + String(day));
    str = str.replace(/HH/g, hour > 9 ? String(hour) : "0" + String(hour));
    str = str.replace(
      /mm/g,
      minute > 9 ? String(minute) : "0" + String(minute)
    );
    str = str.replace(
      /ss/g,
      second > 9 ? String(second) : "0" + String(second)
    );
    return str;
  }

  /**
   * 获取当前时间戳
   *
   * @returns
   */
  static getTimeStamp(): number {
    return new Date().getTime();
  }

  /**
   * 字符串转时间戳
   *
   * @param str 时间字符串
   * @returns 时间戳
   */
  static strToTimeStamp(str: string): number {
    return new Date(str).getTime();
  }
}

export default Time;
