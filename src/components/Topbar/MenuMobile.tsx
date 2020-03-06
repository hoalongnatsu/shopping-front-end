import './MenuMobile.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Drawer } from 'antd';

/* Interface */
import { CategoryState } from 'interface';

const { Item, SubMenu } = Menu;

interface Props {
  visible: boolean,
  closeMobileMenu: () => void,
  categories: CategoryState[]
}

const MenuMobile: React.FC<Props> = ({closeMobileMenu, visible, categories}) => (
  <Drawer
    placement="right"
    closable={false}
    onClose={closeMobileMenu}
    visible={visible}
    drawerStyle={{background: '#001529'}}
    bodyStyle={{padding: 0, backfaceVisibility: "hidden"}}
  >
    <Menu mode="inline" theme="dark">
      <Item key="2">
        <Link to="/">Home</Link>
      </Item>
      <SubMenu title="Sản phẩm">
        <Item key="all">
          <Link to="/products/category/all">All</Link>
        </Item>
        {
          categories.map((category) => (
            <Item key={category._id}>
              <Link to={`/products/category/${category.slug}`}>{category.name}</Link>
            </Item>
          ))
        }
      </SubMenu>
    </Menu>
  </Drawer>
)

export default MenuMobile;
