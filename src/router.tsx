import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import CustomRoute from 'components/Route/CustomRoute';

/* Layout */
import App from 'layouts/App';
import Admin from 'layouts/Admin';

/* Page */
import NotFound from 'pages/NotFound';

/* Lazy Page */
const Home = React.lazy(() => import('pages/Home'));
const About = React.lazy(() => import('pages/About'));
const Colors = React.lazy(() => import('pages/Admin/Colors'));
const CreateColor = React.lazy(() => import('pages/Admin/Colors/Create'));
const EditColor = React.lazy(() => import('pages/Admin/Colors/Edit'));
const Brands = React.lazy(() => import('pages/Admin/Brands'));
const CreateBrand = React.lazy(() => import('pages/Admin/Brands/Create'));
const EditBrand = React.lazy(() => import('pages/Admin/Brands/Edit'));

const Login = React.lazy(() => import('pages/Login'));

interface Props {
  
}

export const routes = [
  /* Admin route */
  { name: 'Create Color', path: '/colors/create', component: CreateColor, layout: Admin, requireLogin: true, isAdmin: true },
  { name: 'Edit Color', path: '/colors/:id/edit', component: EditColor, layout: Admin, requireLogin: true, isAdmin: true },
  { name: 'Colors', path: '/colors', component: Colors, layout: Admin, requireLogin: true, isAdmin: true },
  { name: 'Create Brand', path: '/brands/create', component: CreateBrand, layout: Admin, requireLogin: true, isAdmin: true },
  { name: 'Create Brand', path: '/brands/:id/edit', component: EditBrand, layout: Admin, requireLogin: true, isAdmin: true },
  { name: 'Brands', path: '/brands', component: Brands, layout: Admin, requireLogin: true, isAdmin: true },

  /* Auth */
  { name: 'Login', path: '/login', component: Login, layout: App, requireLogin: false, isAdmin: false },

  /* App route */
  { name: 'About', path: '/about', component: About, layout: App, requireLogin: true, isAdmin: false },
  { name: 'Home', path: '/', component: Home, layout: App, requireLogin: false, isAdmin: false },
  
];

export const RootRouter: React.FC<Props> = () => (
  <HashRouter>
      <Switch>
        {
          routes.map(({name, ...route}) => (
          <CustomRoute key={name} {...route} />
          ))
        }
        <Route path="/*" component={NotFound} />
      </Switch>
    </HashRouter>
)
