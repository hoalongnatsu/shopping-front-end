import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';

import OverlayLoading from 'components/Loading/Overlay'

interface Props {
  path: string,
  component: React.ComponentClass<any> | React.FC<any>,
  layout: React.ComponentClass<any> | React.FC<any>,
}

const PrivateRoute: React.FC<Props> = ({
  path,
  component: Component,
  layout: Layout
}) => {
  const login = localStorage.getItem('jwt');

  return login ? (
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
  ) : (
    <Redirect to="/login" />
  )
}

export default PrivateRoute;
