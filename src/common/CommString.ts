class CommString {
  /**
   * 替换字符串中的某些字符
   *
   * @param str 原始字符串
   * @param oldChar 要替换的字符
   * @param newChar 替换成的字符
   * @returns 替换后的字符串
   */
  static replace(str: string, oldChar: any, newChar: any) {
    return str.replace(oldChar, newChar);
  }
}

export default CommString;
