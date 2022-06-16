/**
 * @description 日常任务
 */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import Back from '@/components/Back';
import Flower from '@/components/Flower';
import FlowerTree from '@/components/FlowerTree';
import { Modal } from 'antd-mobile';
import { QuestionCircleFill, KoubeiFill, FireFill, HeartFill } from 'antd-mobile-icons';
import util from '../../utils/util';
import './index.less';

const Tasks = () => {
  const userInfo = util.getUserInfo() || {};
  const [tasksObj, setTasksObj] = useState(
    userInfo.tasks
      ? userInfo.tasks
      : {
          zheng: 0,
          cai: 0,
          mei: 0,
          creatAt: 0,
        },
  );
  const listInit = [
    {
      key: 'zheng',
      title: '政',
      name: '开源节流',
      num: 0,
      harvestFalg: true,
      taskKey: 'zongye',
      icon: <KoubeiFill fontSize={16} color='#fcb887' />,
    },
    {
      key: 'cai',
      title: '才',
      name: '助宫易物',
      num: 0,
      harvestFalg: true,
      taskKey: 'nuomi',
      icon: <FireFill fontSize={16} color='#f6f6f6' />,
    },
    {
      key: 'mei',
      title: '魅',
      name: '布施济民',
      num: 0,
      harvestFalg: true,
      taskKey: 'hongzao',
      icon: <HeartFill fontSize={16} color='#59ca94' />,
    },
  ];

  const [list, setList] = useState(listInit);

  // 获取当前内务展示数据
  const getNewNum = () => {
    // 梯龄换算成月
    const newData = new Date();
    let diffData = tasksObj.creatAt;
    if (!tasksObj.creatAt) {
      // 如果收获时间默认活动开始时间
      diffData = moment('2022-06-01');
    }
    let hour = moment(newData).diff(moment(diffData), 'hours');

    console.log(hour, 'hour');
    let numCurr = hour * 1000;
    const listInit = [...list];
    listInit.map(item => {
      item.num += numCurr;
    });
    setList(listInit);
  };

  useEffect(() => {
    getNewNum();
  }, []);

  // 获取随机数
  const getRandomNumber = key => {
    const randomObj = {
      zheng: [5, 10],
      cai: [5, 10],
      mei: [2, 5],
    };
    const randomItem = randomObj[key];
    const m = randomItem[1];
    const n = randomItem[0];
    let randomNum = Math.random() * (m - n) + n;
    randomNum = Math.round(randomNum);
    console.log(randomNum, 'randomNum');
    return randomNum;
  };

  // 收获
  const handleHarvest = index => {
    const newData = new Date();
    let userInfoInit = { ...userInfo };
    const handleList = [].concat(list);
    let item = handleList[index];
    let tasksObjInit = { ...tasksObj };
    tasksObjInit.creatAt = newData;
    const festivalObjInit = userInfo.festival
      ? userInfo.festival
      : {
          nuomi: 0,
          zongye: 0,
          hongzao: 0,
          zongzi: 0,
        };
    // 收获操作
    if (item.harvestFalg) {
      tasksObjInit[item.key] += item.num;
      item.num = 0;
      festivalObjInit[item.taskKey] = getRandomNumber(item.key);
      // 设置缓存
      userInfoInit.festival = festivalObjInit;
      userInfoInit.tasks = tasksObjInit;
      util.saveUserInfo(userInfoInit);
      setList(list);
      setTasksObj(tasksObjInit);
    }
    item.harvestFalg = !item.harvestFalg;
    setList(handleList);
  };

  // 顶部提示
  const headTip = () => {
    return Modal.show({
      title: '内务',
      content: (
        <div className='tasks-modal'>
          <div className='tasks-modal-title'>内务打理</div>
          <div className='tasks-modal-content mb10'>
            <p className='mb10'>内务分为“开源节流”，“助宫易物”，“布施济民”三种类型，分别可以获得铜币、珍品和名望。</p>
            <p>打理内务有一定几率获得包粽子的材料。</p>
          </div>
          <div className='tasks-modal-title'>内务奖励</div>
          <div className='tasks-modal-content'>
            <p className='mb10'>开源节流有一定几率获得粽叶。</p>
            <p className='mb10'>助宫易物有一定几率获得糯米。</p>
            <p>布施济民有一定几率获得红枣。</p>
          </div>
        </div>
      ),
      showCloseButton: true,
    });
  };

  // 将数据除以10000进行展示
  const getTaskNumContent = num => {
    num = num / 10000;
    return num;
  };

  return (
    <div className='tasks'>
      <Back />
      <div className='tasks-info'>
        {list.map(item => {
          return (
            <div className='tasks-info-item' key={item.key}>
              <div className='tasks-info-item-icon'>{item.icon}</div>
              <span>
                {getTaskNumContent(tasksObj[item.key])} {tasksObj[item.key] > 0 ? '万' : ''}
              </span>
            </div>
          );
        })}
      </div>
      <div className='tasks-head'>
        <div className='tasks-head-tip' onClick={headTip}>
          <QuestionCircleFill fontSize={28} color='#f69bad' />
        </div>
        <div className='tasks-head-title'>内务打理</div>
      </div>
      <div className='tasks-list'>
        {list.map((item, index) => {
          return (
            <div className='tasks-item' key={item.key}>
              <div className='tasks-item-top'></div>
              <div className='tasks-item-title'>{item.title}</div>
              <div className='tasks-item-name'>
                <span>{item.name}</span>
                <div className='name-circular name-circular1'></div>
                <div className='name-circular name-circular2'></div>
                <div className='name-circular name-circular3'></div>
                <div className='name-circular name-circular4'></div>
                <div className='name-circular name-circular5'></div>
                <div className='name-circular name-circular6'></div>
              </div>
              <div className='tasks-item-num'>{item.num}</div>
              <div className={classnames('tasks-item-btn', { inactive: !item.harvestFalg })} onClick={() => handleHarvest(index)}>
                <div className='btn-flower1'>
                  <Flower />
                </div>
                <div className='btn-flower2'>
                  <Flower />
                </div>
                <span>{item.harvestFalg ? '收获' : '恢复'}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className='tasks-footer'></div>
      <div className='tasks-tree'>
        <FlowerTree />
      </div>
      <div className='tasks-rule'>
        <div className='tasks-rule-title'>
          <span>宫规</span>
        </div>
        <div className='tasks-rule-text'>内务收获 +5%</div>
      </div>
    </div>
  );
};

export default Tasks;
