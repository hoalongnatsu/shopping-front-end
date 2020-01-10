import './Admin.scss';

import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Layout, Menu, Icon } from 'antd';

/* Assets */
import logo from 'assets/icons/logo_transparent.png';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const sidebar = [
  { name: 'Colors', icon: 'bg-colors', to: '/colors' },
  { name: 'Brands', icon: 'sketch', to: '/brands' }
];
const trash = [
  { name: 'Colors', to: '/trash/colors' },
  { name: 'Brands', to: '/trash/brands' }
];

interface ComponentProps {
  
}

type Props = RouteComponentProps<any> & ComponentProps;

interface State {
  collapsed: boolean,
}

class Admin extends Component<Props, State> {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  active = (): string[] => {
    const { pathname } = this.props.location;
    if (pathname.includes('trash')) {
      return [pathname, 'trash'];
    }
    const key = /^\/[a-zA-Z]*/.exec(pathname);
    return key ? [key[0], ''] : ['', '']
  }

  changePage = (item: any) => {
    if (item.key !== this.props.location.pathname) {
      this.props.history.push(item.key)
    }
  }

  render() {
    const { collapsed } = this.state;
    const [selectedKeys, openKeys] = this.active();

    return (
      <Layout>
        <Sider trigger={null} collapsible={true} collapsed={collapsed}>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <Menu theme="dark" mode="inline" onClick={this.changePage} defaultSelectedKeys={[selectedKeys]} defaultOpenKeys={[openKeys]}>
            {
              sidebar.map(({name, to, icon}) => (
                <Menu.Item key={to}>
                  <Icon type={icon} />
                  <span>{name}</span>
                </Menu.Item>
              ))
            }
            <SubMenu
              key="trash"
              title={
                <span>
                  <Icon type="delete" />
                  <span>Trash</span>
                </span>
              }
            >
              {
                trash.map(({name, to}) => (
                  <Menu.Item key={to}>
                    <span>{name}</span>
                  </Menu.Item>
                ))
              }
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content className="admin-content">
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(Admin);
