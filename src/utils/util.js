/**
 * @description 公共方法
 */

// 获取用户信息
const getUserInfo = () => {
  let userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return null;
};

// 保存用户信息
const saveUserInfo = userInfo => {
  if (userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }
};

/**
 * 两个是否可以整除
 * @param {number} num1 除数
 * @param {number} num2 被除数
 * @return {boolean} 是否整除的布尔值
 */
const getNumDivisibleFlag = (num1, num2) => {
  let flag = false;
  // 如果除数小于被除数 则表示不可以被整除
  if (num1 > num2 && num1 / num2 > 1) {
    flag = true;
  }
  return flag;
};

export default { getUserInfo, saveUserInfo, getNumDivisibleFlag };
