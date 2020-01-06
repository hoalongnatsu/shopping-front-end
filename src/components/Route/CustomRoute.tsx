import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';

import OverlayLoading from 'components/Loading/Overlay';
import PrivateRoute from './PrivateRoute';

interface Props {
  path: string,
  requireLogin: boolean,
  isAdmin: boolean,
  component: React.ComponentClass<any> | React.FC<any>,
  layout: React.ComponentClass<any> | React.FC<any>,
}

const CustomRoute: React.FC<Props> = ({
  path,
  isAdmin,
  requireLogin,
  component: Component,
  layout: Layout,
}) => requireLogin ? (
  <PrivateRoute
    path={path}
    isAdmin={isAdmin}
    component={Component}
    layout={Layout}
  />
) : (
  <Route
    exact={true}
    path={path}
    render={props => (
      <Suspense fallback={<OverlayLoading />}>
        <Layout>
          <Component {...props} />
        </Layout>
      </Suspense>
    )}
  />
)

export default CustomRoute;
