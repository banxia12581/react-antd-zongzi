/**
 * @description 首页
 */
import React from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@/components/Avatar';
import FlowerCluster from '@/components/FlowerCluster';
import { Button } from 'antd-mobile';
import './index.less';

const Home = () => {
  const history = useHistory();

  // 页面跳转
  const goTo = path => {
    history.push(path);
  };

  // 入口展示
  const entranceContent = () => {
    return (
      <div className='home-entrance'>
        <Button block shape='rounded' className='entrance-btn' onClick={() => goTo('/tasks')}>
          日常任务
        </Button>
        <Button block shape='rounded' className='entrance-btn' onClick={() => goTo('/festival')}>
          端午活动
        </Button>
      </div>
    );
  };
  return (
    <div className='home'>
      <div className='home-head'>
        <Avatar />
      </div>
      <div className='home-center'></div>
      <div className='home-bg'>
        {/* 门 */}
        <div className='door'>
          <div className='door-beam'>
            <div className='tiaoliang'></div>
          </div>
          <div className='door-frame'>
            <div className='door-top'></div>
            <div className='door-line door-line-left'></div>
            <div className='door-line door-line-right'></div>
            <div className='door-line door-line-bottom'></div>
            <div className='door-frame'>
              <div className='stick-h stick-h1'></div>
              <div className='stick-h stick-h2'></div>
              <div className='stick-h stick-h3'></div>
              <div className='stick-h stick-h4'></div>
              <div className='stick-h stick-h5'></div>
              <div className='stick-h stick-h6'></div>
              <div className='stick-h stick-h7'></div>
              <div className='stick-h stick-h8'></div>
              <div className='stick-h stick-h9'></div>
              <div className='stick-h stick-h10'></div>
              <div className='stick-h stick-h11'></div>
              <div className='stick-h stick-h12'></div>
              <div className='stick-d stick-d1'></div>
              <div className='stick-d stick-d2'></div>
              <div className='stick-d stick-d3'></div>
              <div className='stick-d stick-d4'></div>
              <div className='stick-d stick-d5'></div>
              <div className='stick-d stick-d6'></div>
            </div>
            <div className='door-opening'>
              <div className='door-opening-center'>{entranceContent()}</div>
              <div className='door-opening-decorate door-opening-decorate1'></div>
              <div className='door-opening-decorate door-opening-decorate2'></div>
              <div className='door-opening-decorate door-opening-decorate3'></div>
              <div className='door-opening-flowers'>
                <FlowerCluster />
              </div>
            </div>
          </div>
        </div>
        {/* 地板 */}
        <div className='floor'>
          <div className='floor-line floor-line1'></div>
          <div className='floor-line floor-line2'></div>
          <div className='floor-line floor-line3'></div>
          <div className='floor-line floor-line4'></div>
          <div className='floor-line floor-line5'></div>
          <div className='floor-line floor-line6'></div>
          <div className='floor-line floor-line7'></div>
          <div className='floor-line floor-line8'></div>
          <div className='floor-line floor-line9'></div>
          <div className='floor-line floor-line10'></div>
          <div className='home-cat'>
            <div className='body'></div>
            <div className='head'>
              <div className='ear ear-left'></div>
              <div className='ear ear-right'></div>
              <div className='nose'></div>
              <div className='whisker whisker-left'></div>
              <div className='whisker whisker-right'></div>
            </div>
            <div className='tail'>
              <div className='tail-line'></div>
              <div className='tail-round'></div>
              <div className='tail-end'></div>
            </div>
          </div>
          <div className='home-table'></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
