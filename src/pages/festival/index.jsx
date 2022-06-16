/**
 * @description 端午活动
 */
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import Back from '@/components/Back';
import { Modal, Stepper } from 'antd-mobile';
import { QuestionCircleFill } from 'antd-mobile-icons';
import util from '../../utils/util';
import './index.less';

const Festival = () => {
  const userInfo = util.getUserInfo() || {};
  const [festivalObj, setFestivalObj] = useState(
    userInfo.festival
      ? userInfo.festival
      : {
          nuomi: 20,
          zongye: 10,
          hongzao: 10,
          zongzi: 150,
        },
  );
  const list = [
    {
      key: 'nuomi',
      name: '糯米',
    },
    {
      key: 'zongye',
      name: '粽叶',
    },
    {
      key: 'hongzao',
      name: '红枣',
    },
    {
      key: 'zongzi',
      name: '粽子',
    },
  ];

  // 是否可以进行兑换操作的布尔值 true-能 false-不能
  const [activeFlag, setActiveFlag] = useState(false);

  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  // 兑换的粽子数量
  const [convertNum, setConvertNum] = useState(1);
  const [countdown, setCountdown] = useState('');
  let timer = null;

  // 获取当前兑换按钮是否可以点击
  const getInactiveFlag = festivalObj => {
    let activeInit = false;
    let nuomi = festivalObj.nuomi;
    let zongye = festivalObj.zongye;
    let hongzao = festivalObj.hongzao;
    if (nuomi && zongye && hongzao) {
      let nuomiFlag = util.getNumDivisibleFlag(nuomi, 10);
      let zongyeFlag = util.getNumDivisibleFlag(zongye, 2);
      let hongzaoFlag = util.getNumDivisibleFlag(hongzao, 2);
      if (nuomiFlag && zongyeFlag && hongzaoFlag) {
        activeInit = true;
      }
    }
    setActiveFlag(activeInit);
  };

  const getCountdown = () => {
    let nowDate = new Date();
    // console.log(nowDate, 'nowDate');
    // 获取的2022-06-05的23:59:59的时间戳
    let endTime = moment('2022-06-05').endOf('day').format('x');

    let countdownInit = '';
    // 剩余时间 毫秒
    let surplusTime = endTime - nowDate.getTime();
    if (surplusTime <= 0) {
      clearTimeout(timer);
      countdownInit = '活动已结束';
      setCountdown(countdownInit);
    } else {
      // 剩余时间 秒
      let runTime = surplusTime / 1000;
      const day = Math.floor(runTime / 86400);
      runTime = runTime % 86400;
      const hour = Math.floor(runTime / 3600);
      runTime = runTime % 3600;
      const minute = Math.floor(runTime / 60);
      runTime = runTime % 60;
      const second = Math.floor(runTime);
      const dayText = day ? `${day}天` : '';
      countdownInit = `剩余时间：${dayText} ${hour}:${minute}:${second}`;
      setCountdown(countdownInit);
      timer = setTimeout(getCountdown, 1000);
    }
  };

  useEffect(() => {
    getInactiveFlag(festivalObj);
    getCountdown();
  }, []);

  useEffect(() => {
    // 清除定时
    return () => {
      clearInterval(timer);
    };
  }, []);

  // 顶部提示
  const headTip = () => {
    return Modal.show({
      title: '"粽"得凤仪',
      content: (
        <div className='festival-modal'>
          <div className='festival-modal-title'>合成粽子</div>
          <div className='festival-modal-content mb10'>
            <p className='mb10'>10*糯米+2*粽叶+2*红枣可以兑换1个糯米粽子。</p>
            <p>当糯米、粽叶、红枣的比例不是5:1:1时，无法进行兑换。</p>
          </div>
          <div className='festival-modal-title'>称号奖励</div>
          <div className='festival-modal-content'>
            <p className='mb10'>当前粽子数量达到50个可获得称号“淑仪倾城”。</p>
            <p className='mb10'>当前粽子数量达到100个可获得称号“花容初绽”。</p>
            <p className='mb10'>当前粽子数量达到200个可获得称号“花成蜜就”。</p>
            <p className='mb10'>当前粽子数量达到300个可获得称号“宠冠六宫”。</p>
            <p className='mb10'>当前粽子数量达到400个可获得称号“凤仪千载”。</p>
            <p>称号自动获取无需额外操作</p>
          </div>
        </div>
      ),
      showCloseButton: true,
    });
  };

  // 粽子展示
  const zongziContent = () => {
    return (
      <div className='festival-zongzi'>
        <div className='festival-zongzi-left'></div>
        <div className='festival-zongzi-center'></div>
        <div className='festival-zongzi-right'></div>
      </div>
    );
  };

  // 兑换确定操作
  const convertOnConfirm = () => {
    setVisible(false);
    let festivalObjInit = { ...festivalObj };
    console.log(convertNum, 'convertNum');
    festivalObjInit.nuomi -= convertNum * 10;
    festivalObjInit.zongye -= convertNum * 2;
    festivalObjInit.hongzao -= convertNum * 2;
    festivalObjInit.zongzi += convertNum;
    console.log(festivalObjInit, 'festivalObjInit');
    // 设置缓存
    let userInfoInit = { ...userInfo };
    userInfoInit.festival = festivalObjInit;
    util.saveUserInfo(userInfoInit);
    setFestivalObj(festivalObjInit);
    getInactiveFlag(festivalObjInit);
  };

  // 获取可以兑换的数量
  const getConvertCount = () => {
    let nuomi = festivalObj.nuomi;
    let zongye = festivalObj.zongye;
    let hongzao = festivalObj.hongzao;
    let nuomiNum = Math.floor((nuomi * 100) / (10 * 100));
    let zongyeNum = Math.floor((zongye * 100) / (2 * 100));
    let hongzaoNum = Math.floor((hongzao * 100) / (2 * 100));
    return Math.min(nuomiNum, zongyeNum, hongzaoNum);
  };

  // 兑换操作
  const handleConvert = () => {
    if (!activeFlag) return;
    const count = getConvertCount();
    setConvertNum(1);
    setCount(count);
    setVisible(true);
  };

  return (
    <div className='festival'>
      <div className='festival-content'>
        <Back />
        <div className='festival-head'>
          <div className='festival-head-tip' onClick={headTip}>
            <QuestionCircleFill fontSize={28} color='#f69bad' />
          </div>
          <div className='festival-head-title'>"粽"得凤仪</div>
        </div>
        <div className='festival-time'>{countdown}</div>
        <div className='festival-convert'>
          <div className='festival-convert-zongzi'>{zongziContent()}</div>
          <div className='festival-convert-zongzi2'>{zongziContent()}</div>
          <div className='festival-convert-num'>
            {list.map(item => {
              return (
                <div className='festival-convert-num-item' key={item.key}>
                  {item.name}: {festivalObj[item.key]}
                </div>
              );
            })}
          </div>
          <div className='festival-convert-rule'>
            <div className='festival-convert-rule-nuomi'></div> x 10<div className='festival-convert-rule-add'></div>
            <div className='festival-convert-rule-zongye'></div> x 2<div className='festival-convert-rule-add'></div>
            <div className='festival-convert-rule-hongzao'></div> x 2
          </div>
          <div className={classnames('festival-convert-btn', { inactive: !activeFlag })} onClick={handleConvert}>
            兑换
          </div>
        </div>
      </div>
      <div className='festival-room'>
        <div className='festival-room-wall'>
          <div className='wall-poetry'>
            <div className='wall-poetry-nail'></div>
            <div className='wall-poetry-shaft wall-poetry-shaft-top'></div>
            <div className='wall-poetry-inner'>
              <div className='wall-poetry-title'>浣溪沙·端午</div>
              <div className='wall-poetry-author'>宋·苏轼</div>
              <div className='wall-poetry-content'>轻汗微微透碧纨，明朝端午浴芳兰。流香涨腻满晴川。彩线轻缠红玉臂，小符斜挂绿云鬟。佳人相见一千年。</div>
            </div>
            <div className='wall-poetry-shaft wall-poetry-shaft-bottom'></div>
          </div>
        </div>
        <div className='festival-room-floor'>
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
        </div>
      </div>
      <Modal
        visible={visible}
        content={
          <div className='festival-modal'>
            <div className='festival-modal-text'>最多可以兑换: {count}</div>
            <div className='festival-modal-stepper'>
              <Stepper
                step={1}
                value={convertNum}
                min={1}
                max={count}
                onChange={value => {
                  setConvertNum(value);
                }}
              />
            </div>
            <div className='festival-modal-confirm' onClick={() => convertOnConfirm()}>
              兑换
            </div>
          </div>
        }
        showCloseButton={true}
        closeOnAction
        onClose={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default Festival;
