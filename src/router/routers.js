/**
 * @description 路由管理
 */
import Home from '../pages/home';
import Tasks from '../pages/tasks';
import Festival from '../pages/festival';
export const routes = [
  { path: '/home', component: Home },
  { path: '/tasks', component: Tasks },
  { path: '/festival', component: Festival },
];
