/**
 * Create Code from Name
 * @param name
 * @returns
 */
export const createCode = (name: string) => {
  // 소문자를 제거하고 대문자만 남김
  let code = name.replace(/[^A-Z]/g, '');
  if (code.length < 3) {
    // 공백으로 구분되어 있을 경우
    code = name
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('');
    if (code.length < 3) {
      // 첫 3글자 남기고 나머지는 제거
      return name.slice(0, 3).toUpperCase();
    } else {
      return code;
    }
  } else {
    return code;
  }
};
