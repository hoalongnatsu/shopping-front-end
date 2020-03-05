import './index.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Dropdown, Icon, Menu, Drawer } from 'antd';

/* Components */
import ProductSearch from 'components/ProductSearch';
import Logo from 'components/Logo';

/* Interface */
import { RootState, CategoryState, UserState } from 'interface';

/* Actions */
import { get_all_categories } from 'actions/categories';
import { logout } from 'actions/user';

const { Item, SubMenu } = Menu;
const { REACT_APP_IMAGE_URL, REACT_APP_SERVER_AVATAR_IMAGE_FOLDER } = process.env;
const IMAGE_URL = `${REACT_APP_IMAGE_URL}/${REACT_APP_SERVER_AVATAR_IMAGE_FOLDER}`;

interface ComponentProps {
  
}

interface StateToProps {
  categories: CategoryState[],
  user: UserState
}

interface DispatchProps {
  get_all_categories: () => void,
  logout: () => void,
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
              <Link to={`/products/category/${category.slug}`}>{category.name}</Link>
            </Item>
          ))
        }
      </Menu>
    )
  }

  _renderDropDownUser = () => {
    const { user, logout } = this.props;

    return (
      user?.jwt ? (
        <Menu>
          <Item key="profile">
            <Link to="/">Hồ sơ cá nhân</Link>
          </Item>
          <Item key="bill">
            <Link to="/">Đơn hàng</Link>
          </Item>
          <Item key="game">
            <Link to="/">Quay số</Link>
          </Item>
          <Menu.Divider />
          <Item key="logout" onClick={logout}>
            Thoát
          </Item>
        </Menu>
      ) : (
        <Menu>
          <Item key="register">
            <Link to="/login">Đăng nhập</Link>
          </Item>
        </Menu>
      )
    )
  }

  render() {
    const { categories, user } = this.props;
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
              <div className={user?.jwt ? "topbar__icon topbar__icon--avatar" : "topbar__icon"}>
                <Dropdown overlay={this._renderDropDownUser}>
                  {
                    user?.jwt ? (
                      <div className="avatar">
                        {
                          user?.meta?.avatar ? (
                            <img src={`${IMAGE_URL}/${user.meta?.avatar}`} alt={user.username} />
                          ) : user.username[0]
                        }
                      </div>
                    ) : (
                      <Icon type="user" />
                    )
                  }
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
        {showSearch && <ProductSearch />}
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { categories, user } = state;

  return {
    categories,
    user
  }
}

export default connect(mapStateToProps, { get_all_categories, logout })(Topbar);
