import './Admin.scss';

import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Layout, Menu, Icon } from 'antd';

/* Assets */
import logo from 'assets/icons/logo_transparent.png';

const { Header, Sider, Content } = Layout;
const sidebar = [
  { name: 'Colors', to: '/colors', icon: 'bg-colors' },
  { name: 'Brands', to: '/brands', icon: 'sketch' }
]

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

  selectedKeys = (): string => {
    const key = /^\/[a-zA-Z]*/.exec(this.props.location.pathname);
    return key ? key[0] : ''
  }

  changePage = (item: any) => {
    if (item.key !== this.props.location.pathname) {
      this.props.history.push(item.key)
    }
  }

  render() {
    const { collapsed } = this.state;
    const selectedKeys = this.selectedKeys();

    return (
      <Layout>
        <Sider trigger={null} collapsible={true} collapsed={collapsed}>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <Menu theme="dark" mode="inline" onClick={this.changePage} selectedKeys={[selectedKeys]}>
            {
              sidebar.map(({name, to, icon}) => (
                <Menu.Item key={to}>
                  <Icon type={icon} />
                  <span>{name}</span>
                </Menu.Item>
              ))
            }
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
