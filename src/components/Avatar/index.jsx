/**
 * @description 头像组件
 */
import React from 'react';
import './index.less';
import util from '../../utils/util';

const Avatar = () => {
  const userInfo = util.getUserInfo() || {};

  const getDesignationByZongziNum = () => {
    const festival = userInfo.festival ? userInfo.festival : {};
    const zongzi = festival.zongzi ? festival.zongzi : 0;
    let name = '殿上佳人';
    if (zongzi < 50) {
      name = '殿上佳人';
    } else if (zongzi <= 100) {
      name = '淑仪倾城';
    } else if (zongzi <= 200) {
      name = '花容初绽';
    } else if (zongzi <= 300) {
      name = '花成蜜就';
    } else if (zongzi <= 400) {
      name = '宠冠六宫';
    } else if (zongzi > 400) {
      name = '凤仪千载';
    }
    return name;
  };

  return (
    <div className='avatar'>
      <img className='avatar-img' src='https://p6-passport.byteacctimg.com/img/user-avatar/c6c1a335a3b48adc43e011dd21bfdc60~300x300.image' alt='' />
      <div className='avatar-nickname'>叶一一</div>
      <div className='avatar-designation'>
        <span>{getDesignationByZongziNum()}</span>
        <div className='avatar-flower'>
          <div className='avatar-flower-leaf avatar-flower-leaf1'></div>
          <div className='avatar-flower-leaf avatar-flower-leaf2'></div>
          <div className='avatar-flower-leaf avatar-flower-leaf3'></div>
          <div className='avatar-flower-leaf avatar-flower-leaf4'></div>
          <div className='avatar-flower-leaf avatar-flower-leaf5'></div>
          <div className='avatar-flower-circle'></div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
