import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from './routers';

const Router = ({ ...props }) => {
  return (
    <React.Suspense fallback={null}>
      <Switch>
        <Redirect from='/' exact to='/home' />
        {routes.map((route, index) => {
          return <Route key={index} {...route} {...props} />;
        })}
      </Switch>
    </React.Suspense>
  );
};

export default Router;
