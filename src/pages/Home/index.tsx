import './index.scss';

import React, { Component } from 'react';
import { Typography, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

/* Components */
import Banner from 'components/Banner';
import TopSaleProductAdvertising from 'components/TopSaleProductAdvertising';
import Subscribtion from 'components/Subscribtion';
import Footer from 'components/Footer';
import CardProductItem from 'components/Card/Products/Item';

const { Title } = Typography;

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
          <Title level={3} style={{textTransform: "uppercase"}}>Bán chạy nhất</Title>
          <Row gutter={[16, 16]} style={{marginBottom: 20}}>
            <Col xs={24} sm={12} md={6}>
              <CardProductItem tag={true} type="hot" />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <CardProductItem tag={true} type="new" />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <CardProductItem />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <CardProductItem />
            </Col>
          </Row>
          <Title level={3} style={{textTransform: "uppercase"}} id="shopping">Sản phẩm mới</Title>
          <Row gutter={[16, 16]} style={{marginBottom: 20}}>
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
            <Col xs={24} style={{textAlign: "right"}}>
              <Link className="btn-text" to="">Xem tất cả &rarr;</Link>
            </Col>
          </Row>
          <Title level={3} style={{textTransform: "uppercase"}} id="shopping">Sản phẩm đã xem</Title>
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
          </Row>
        </section>
        <Subscribtion />
        <Footer />
      </>
    )
  }
}

export default Home;
