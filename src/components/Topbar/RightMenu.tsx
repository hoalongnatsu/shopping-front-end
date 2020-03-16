import './RightMenu.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Dropdown, Icon, Menu, Modal, Button } from 'antd';

/* Components */
import CartTable from 'components/Cart/Table';

/* Interface */
import { RootState, UserState } from 'interface';

/* Actions */
import { logout } from 'actions/user';

const { Item } = Menu;
const { REACT_APP_IMAGE_URL, REACT_APP_SERVER_AVATAR_IMAGE_FOLDER } = process.env;
const IMAGE_URL = `${REACT_APP_IMAGE_URL}/${REACT_APP_SERVER_AVATAR_IMAGE_FOLDER}`;

interface ComponentProps {
  showSearch: boolean,
  toggleSearchInput: () => void,
  showMobileMenu: () => void
}

interface StateToProps {
  user: UserState
}

interface DispatchProps {
  logout: () => void,
}

type Props = ComponentProps & StateToProps & DispatchProps;

interface State {
  showModal: boolean
}

class RightMenu extends Component<Props, State> {
  state = {
    showModal: false
  }

  openModal = () => {
    this.setState({ showModal: true });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    const {
      showSearch, toggleSearchInput,
      showMobileMenu,
      user, logout
    } = this.props;
    const { showModal } = this.state;

    return (
      <div className="topbar__right">
        <div className="topbar__icon">
          <Icon type={showSearch ? "close" : "search"} onClick={toggleSearchInput} />
        </div>
        <div className="topbar__icon" onClick={this.openModal}>
          <Badge count={0} showZero={true} overflowCount={99}>
            <Icon type="shopping-cart" />
          </Badge>
        </div>
        <div className={user?.jwt ? "topbar__icon topbar__icon--avatar" : "topbar__icon"}>
          <Dropdown
            overlay={() => (
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
            )}
          >
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
          <Icon type="menu" onClick={showMobileMenu} />
        </div>
        <Modal
          className="cart-modal"
          visible={showModal}
          title={`Có 0 sản phẩm`}
          onCancel={this.closeModal}
          width={800}
          footer={[
            <Button key="cancel" onClick={this.closeModal}>
              Thoát
            </Button>,
            <Button key="checkout" type="primary">
              <Link to="/thanhtoan">Thanh toán</Link>
            </Button>,
          ]}
        >
          <CartTable />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { user } = state;

  return {
    user
  }
}

export default connect(mapStateToProps, { logout })(RightMenu);
