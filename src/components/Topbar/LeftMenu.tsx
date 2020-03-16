import './LeftMenu.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Icon, Menu } from 'antd';

/* Interface */
import { CategoryState } from 'interface';

const { Item } = Menu;

interface Props {
  categories: CategoryState[]
}

const LeftMenu: React.FC<Props> = ({categories}) => (
  <div className="topbar__left">
    <div className="topbar__item">
      <Link className="topbar__link" to="/">Trang chủ</Link>
    </div>
    <div className="topbar__item">
      <Dropdown
        overlay={() => (
          <Menu>
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
          </Menu>
        )}
      >
        <div className="topbar__link">
          Sản phẩm
          <Icon style={{marginLeft: 5}} type="down" />
        </div>
      </Dropdown>
    </div>
    <div className="topbar__item">
      <Link className="topbar__link" to="/thanhtoan">Thanh toán</Link>
    </div>
  </div>
)

export default LeftMenu;
