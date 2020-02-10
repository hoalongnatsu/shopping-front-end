import './index.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Dropdown, Icon, Menu, Drawer } from 'antd';

/* Components */
import ProductSearch from 'components/ProductSearch';
import Logo from 'components/Logo';

const { Item, SubMenu } = Menu;

interface Props {
  
}

interface State {
  showSearch: boolean,
  showMobileMenu: boolean
}

class Topbar extends Component<Props, State> {
  state = {
    showSearch: false,
    showMobileMenu: false
  }

  toggleSearchInput = () => {
    const { showSearch } = this.state;
    this.setState({showSearch: !showSearch});
  }

  showMobileMenu = () => {
    this.setState({showMobileMenu: true});
  }

  closeMobileMenu = () => {
    this.setState({showMobileMenu: false});
  }

  _renderDropDownCategory = () => {
    return (
      <Menu>
        <Item key="0">
          <Link to="/login">Áo</Link>
        </Item>
        <Item key="1">
          <Link to="/login">Quần</Link>
        </Item>
      </Menu>
    )
  }

  _renderDropDownUser = () => {
    return (
      <Menu>
        <Item key="login">
          <Link to="/login">Đăng ký</Link>
        </Item>
        <Item key="register">
          <Link to="/login">Đăng nhập</Link>
        </Item>
      </Menu>
    )
  }

  render() {
    const { showSearch, showMobileMenu } = this.state;

    return (
      <div className="topbar">
        <div className="topbar__container">
          <Link className="topbar__logo" to="/">
            <Logo />
          </Link>
          <div className="topbar__content">
            <div className="topbar__left">
              <div className="topbar__item">
                <Link className="topbar__link" to="/">Trang chủ</Link>
              </div>
              <div className="topbar__item">
                <Dropdown overlay={this._renderDropDownCategory}>
                  <div className="topbar__link">
                    Sản phẩm
                    <Icon style={{marginLeft: 5}} type="down" />
                  </div>
                </Dropdown>
              </div>
            </div>
            <div className="topbar__right">
              <div className="topbar__icon">
                <Icon type={showSearch ? "close" : "search"} onClick={this.toggleSearchInput} />
              </div>
              <div className="topbar__icon">
                <Badge count={0} showZero={true} overflowCount={99}>
                  <Icon type="shopping-cart" />
                </Badge>
              </div>
              <div className="topbar__icon">
                <Dropdown overlay={this._renderDropDownUser}>
                  <Icon type="user" />
                </Dropdown>
              </div>
              <div className="topbar__icon topbar__icon--menu">
                <Icon type="menu" onClick={this.showMobileMenu} />
              </div>
            </div>
          </div>
        </div>
        <Drawer
          placement="right"
          closable={false}
          onClose={this.closeMobileMenu}
          visible={showMobileMenu}
          drawerStyle={{background: '#001529'}}
          bodyStyle={{padding: 0, backfaceVisibility: "hidden"}}
        >
          <Menu mode="inline" theme="dark">
            <Item key="2">
              <Link to="/">Home</Link>
            </Item>
            <SubMenu title="Sản phẩm">
              <Item key="3">
                <Link to="/login">Áo</Link>
              </Item>
              <Item key="4">
                <Link to="/login">Quần</Link>
              </Item>
            </SubMenu>
          </Menu>
        </Drawer>
        {showSearch && <ProductSearch />}
      </div>
    )
  }
}

export default Topbar;
