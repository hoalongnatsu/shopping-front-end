import './index.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Dropdown, Icon, Menu, Drawer } from 'antd';

/* Components */
import ProductSearch from 'components/ProductSearch';
import Logo from 'components/Logo';

/* Interface */
import { RootState, CategoryState } from 'interface';

/* Actions */
import { get_all_categories } from 'actions/categories';

const { Item, SubMenu } = Menu;

interface ComponentProps {
  
}

interface StateToProps {
  categories: CategoryState[],
}

interface DispatchProps {
  get_all_categories: () => void,
}

type Props = ComponentProps & StateToProps & DispatchProps;

interface State {
  showSearch: boolean,
  showMobileMenu: boolean
}

class Topbar extends Component<Props, State> {
  state = {
    showSearch: false,
    showMobileMenu: false
  }

  componentDidMount = () => {
    const { categories, get_all_categories } = this.props;

    if (categories.length === 0) {
      get_all_categories();
    }
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
    const { categories } = this.props;

    return (
      <Menu>
        <Item key="all">
          <Link to="/products/category/all">All</Link>
        </Item>
        {
          categories.map((category) => (
            <Item key={category._id}>
              <Link to={`/products/category/${category.name}`}>{category.name}</Link>
            </Item>
          ))
        }
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
    const { categories } = this.props;
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
              {
                categories.map((category) => (
                  <Item key={category._id}>
                    <Link to={`/products/category/${category.name}`}>{category.name}</Link>
                  </Item>
                ))
              }
            </SubMenu>
          </Menu>
        </Drawer>
        {showSearch && <ProductSearch />}
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { categories } = state;

  return {
    categories
  }
}

export default connect(mapStateToProps, { get_all_categories })(Topbar);
