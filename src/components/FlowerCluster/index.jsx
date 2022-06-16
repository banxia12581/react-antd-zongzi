/**
 * @description 花丛组件
 */
import React from 'react';
import './index.less';

const FlowerCluster = () => {
  return (
    <div className='flowercluster'>
      <div className='flower-leaves'></div>
      <div className='bunch'>
        <div className='flower'>
          <div className='petal'></div>
          <div className='petal'></div>
          <div className='petal'></div>
          <div className='petal'></div>
          <div className='petal'></div>
        </div>
        <div className='flower'>
          <div className='petal'></div>
          <div className='petal'></div>
          <div className='petal'></div>
          <div className='petal'></div>
          <div className='petal'></div>
        </div>
        <div className='flower'>
          <div className='petal'></div>
          <div className='petal'></div>
          <div className='petal'></div>
          <div className='petal'></div>
          <div className='petal'></div>
        </div>
      </div>
    </div>
  );
};
export default FlowerCluster;
