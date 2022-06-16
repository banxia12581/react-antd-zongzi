/**
 * @description 回退按钮组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './index.less';

const Back = ({ ...props }) => {
  const history = useHistory();
  const { path } = props;

  // 点击事件
  const handleClick = () => {
    history.push(path);
  };

  return (
    <div className='back' onClick={handleClick}>
      <div className='back-left'></div>
      <div className='back-right'></div>
    </div>
  );
};
Back.propTypes = {
  path: PropTypes.string, // 跳转路径
};

Back.defaultProps = {
  path: '/home',
};

export default Back;
