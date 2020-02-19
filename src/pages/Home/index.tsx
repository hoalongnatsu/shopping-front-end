import './index.scss';

import React, { Component } from 'react';

/* Components */
import Banner from 'components/Banner';
import TopSaleProductAdvertising from 'components/TopSaleProductAdvertising';
import HotProducts from 'components/HotProducts';
import NewProducts from 'components/NewProducts';
import Subscribtion from 'components/Subscribtion';

interface Props {
  
}

interface State {
  
}

class Home extends Component<Props, State> {
  state = {}

  render() {
    return (
      <>
        <Banner />
        <section className="home-section container">
          <TopSaleProductAdvertising />
          <HotProducts />
          <NewProducts />
          {/* <Title level={3} style={{textTransform: "uppercase"}} id="shopping">Sản phẩm đã xem</Title>
          <Row gutter={[16, 16]} style={{marginBottom: 60}}>
            <Col xs={24} sm={12} md={6}>
              <CardProductItem />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <CardProductItem />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <CardProductItem />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <CardProductItem />
            </Col>
          </Row> */}
        </section>
        <Subscribtion />
      </>
    )
  }
}

export default Home;
