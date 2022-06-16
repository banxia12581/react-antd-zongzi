/**
 * @description 路由组件
 */

import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Routes from './router';
import '../src/less/index.less';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

class App extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Router>
          <Route path='/' component={Routes} />
        </Router>
      </ConfigProvider>
    );
  }
}

export default App;
