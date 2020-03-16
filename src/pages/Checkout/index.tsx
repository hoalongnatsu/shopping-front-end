import './index.scss';

import React, { Component } from 'react';
import { Typography } from 'antd';

/* Components */
import CartTable from 'components/Cart/Table';

const { Title } = Typography;

interface Props {
  
}

interface State {
  
}

class Checkout extends Component<Props, State> {
  state = {}

  render() {
    return (
      <section className="container">
        <div className="cart-section box-shadow">
          <Title level={3}>Có 0 sản phẩm</Title>
          <CartTable />
        </div>
        <div className="checkout-section">
          <Title level={3}>Thanh toán</Title>
        </div>
      </section>
    )
  }
}

export default Checkout;
