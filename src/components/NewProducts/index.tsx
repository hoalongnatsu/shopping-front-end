import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, Typography, Row, Col, Skeleton } from 'antd';

/* Components */
import CardProductItem from 'components/Card/Products/Item';

/* Interface */
import { RootState, ProductState } from 'interface';

/* Actions */
import { get_new_products } from 'actions/products';

/* Helpers */
import {
  create_loading_selector,
  create_error_selector,
} from 'helpers/selectors';

const { Title } = Typography;

interface ComponentProps {
  
}

interface StateToProps {
  new_products: ProductState[],
  loading: boolean,
  error: boolean,
  message: string
}

interface DispatchProps {
  get_new_products: () => void
}

type Props = ComponentProps & StateToProps & DispatchProps;

interface State {
  
}

class NewProducts extends Component<Props, State> {
  state = {}

  componentDidMount() {
    const { new_products, get_new_products } = this.props;
    
    if (new_products.length === 0) {
      get_new_products();
    }
  }

  render() {
    const { new_products, loading, error, message } = this.props;

    return (
      <>
        <Title level={3} style={{textTransform: "uppercase"}} id="shopping">Sản phẩm mới</Title>
        {
          error ? (
            <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />
          ) : (
            <Row gutter={[16, 16]} style={{marginBottom: 20}}>
              {
                loading ?
                  (new Array(8).fill(1)).map((_, index) => (
                    <Col key={index} xs={24} sm={12} md={6}>
                      <div className="box-shadow" style={{padding: 10}}><Skeleton active={true} paragraph={{rows: 4}} /></div>
                    </Col>
                  ))
                :
                  <>
                    {
                      new_products.map((product) => (
                        <Col key={product._id} xs={24} sm={12} md={6}>
                          <CardProductItem tag={true} type="new" product={product} />
                        </Col>
                      ))
                    }
                    <Col xs={24} style={{textAlign: "right"}}>
                      <Link className="btn-text" to="/products/category/all">Xem tất cả &rarr;</Link>
                    </Col>
                  </>
              }
            </Row>
          )
        }
      </>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { new_products, loading, errors, feedback } = state;

  return {
    new_products,
    loading: create_loading_selector(['GET_NEW_PRODUCTS'])(loading),
    error: create_error_selector(['GET_NEW_PRODUCTS'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, { get_new_products })(NewProducts);
