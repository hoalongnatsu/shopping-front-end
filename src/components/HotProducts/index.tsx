import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Typography, Row, Col, Skeleton } from 'antd';

/* Components */
import CardProductItem from 'components/Card/Products/Item';

/* Interface */
import { RootState, ProductState } from 'interface';

/* Actions */
import { get_hot_products } from 'actions/products';

/* Helpers */
import {
  create_loading_selector,
  create_error_selector,
} from 'helpers/selectors';

const { Title } = Typography;

interface ComponentProps {
  
}

interface StateToProps {
  hot_products: ProductState[],
  loading: boolean,
  error: boolean,
  message: string
}

interface DispatchProps {
  get_hot_products: () => void
}

type Props = ComponentProps & StateToProps & DispatchProps;

interface State {
  
}

class HotProducts extends Component<Props, State> {
  state = {}

  componentDidMount() {
    const { hot_products, get_hot_products } = this.props;
    
    if (hot_products.length === 0) {
      get_hot_products();
    }
  }

  render() {
    const { hot_products, loading, error, message } = this.props;

    return (
      <>
      <Title level={3} style={{textTransform: "uppercase"}}>Bán chạy nhất</Title>
      {
        error ? (
          <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />
        ) : (
          <Row gutter={[16, 16]} style={{marginBottom: 20}}>
            {
              loading ?
                (new Array(4).fill(1)).map((_, index) => (
                  <Col key={index} xs={12} sm={8} md={6}>
                    <div className="box-shadow" style={{padding: 10}}><Skeleton active={true} paragraph={{rows: 4}} /></div>
                  </Col>
                ))
              :
                hot_products.map((product) => (
                  <Col key={product._id} xs={12} sm={8} md={6}>
                    <CardProductItem tag={true} type="hot" product={product} />
                  </Col>
                ))
            }
          </Row>
        )
      }
      </>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { hot_products, loading, errors, feedback } = state;

  return {
    hot_products,
    loading: create_loading_selector(['GET_HOT_PRODUCTS'])(loading),
    error: create_error_selector(['GET_HOT_PRODUCTS'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, { get_hot_products })(HotProducts);
