import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';

import OverlayLoading from 'components/Loading/Overlay'

interface Props {
  path: string,
  isAdmin: boolean,
  component: React.ComponentClass<any> | React.FC<any>,
  layout: React.ComponentClass<any> | React.FC<any>,
}

const PrivateRoute: React.FC<Props> = ({
  path,
  isAdmin,
  component: Component,
  layout: Layout,
}) => {
  const user = JSON.parse(localStorage.getItem('user') as string);
  const login = user?.jwt;

  if (login) {
    if(isAdmin) {
      if (user?.admin) {
        return (
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
      }

      return <Redirect to="/" />
    }

    return (
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
  }

  return <Redirect to="/login" />
}

export default PrivateRoute;
