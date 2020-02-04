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

/* Admin */
const AdminPage = React.lazy(() => import('pages/Admin'));
const Colors = React.lazy(() => import('pages/Admin/Colors'));
const TrashColors = React.lazy(() => import('pages/Admin/Colors/Trash'));
const CreateColor = React.lazy(() => import('pages/Admin/Colors/Create'));
const EditColor = React.lazy(() => import('pages/Admin/Colors/Edit'));
const Brands = React.lazy(() => import('pages/Admin/Brands'));
const TrashBrands = React.lazy(() => import('pages/Admin/Brands/Trash'));
const CreateBrand = React.lazy(() => import('pages/Admin/Brands/Create'));
const EditBrand = React.lazy(() => import('pages/Admin/Brands/Edit'));
const Products = React.lazy(() => import('pages/Admin/Products'));
const CreateProducts = React.lazy(() => import('pages/Admin/Products/Create'));
const EditProducts = React.lazy(() => import('pages/Admin/Products/Edit'));

const Login = React.lazy(() => import('pages/Login'));

interface Props {
  
}

export const routes = [
  /* Admin route */
  { name: 'Create Color', path: '/admin/colors/create', component: CreateColor, layout: Admin, requireLogin: true, isAdmin: true },
  { name: 'Edit Color', path: '/admin/colors/:id/edit', component: EditColor, layout: Admin, requireLogin: true, isAdmin: true },
  { name: 'Colors', path: '/admin/colors', component: Colors, layout: Admin, requireLogin: true, isAdmin: true },
  { name: 'Create Brand', path: '/admin/brands/create', component: CreateBrand, layout: Admin, requireLogin: true, isAdmin: true },
  { name: 'Edit Brand', path: '/admin/brands/:id/edit', component: EditBrand, layout: Admin, requireLogin: true, isAdmin: true },
  { name: 'Brands', path: '/admin/brands', component: Brands, layout: Admin, requireLogin: true, isAdmin: true },
  { name: 'Create Product', path: '/admin/products/create', component: CreateProducts, layout: Admin, requireLogin: true, isAdmin: true },
  { name: 'Edit Product', path: '/admin/products/:id/edit', component: EditProducts, layout: Admin, requireLogin: true, isAdmin: true },
  { name: 'Products', path: '/admin/products', component: Products, layout: Admin, requireLogin: true, isAdmin: true },
  
  /* Trash */
  { name: 'Colors', path: '/admin/trash/colors', component: TrashColors, layout: Admin, requireLogin: true, isAdmin: true },
  { name: 'Colors', path: '/admin/trash/brands', component: TrashBrands, layout: Admin, requireLogin: true, isAdmin: true },
  
  { name: 'Admin', path: '/admin', component: AdminPage, layout: Admin, requireLogin: true, isAdmin: true },

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
