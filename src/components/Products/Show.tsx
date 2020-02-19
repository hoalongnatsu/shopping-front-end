import './Show.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Skeleton, Alert, Empty } from 'antd';

/* Components */
import CardProductItem from 'components/Card/Products/Item';

/* Interface */
import { RootState, ProductState } from 'interface';

/* Actions */
import { get_products_by_filter } from 'actions/products';

/* Helpers */
import {
  create_loading_selector,
  create_error_selector,
  descending_order_selector
} from 'helpers/selectors';

interface ComponentProps {
  category_id: string,
}

interface StateToProps {
  products: ProductState[],
  loading: boolean,
  error: boolean,
  message: string
}

interface DispatchProps {
  get_products_by_filter: (
    color_id: string,
    size: string,
    price_range: number[],
    category_id: string,
    brand_id: string,
    page: number
  ) => void,
}

type Props = ComponentProps & StateToProps & DispatchProps;

interface State {
  prevProps: ComponentProps | null
}

class Show extends Component<Props, State> {
  state = {
    prevProps: null
  }

  static getDerivedStateFromProps(props: Props, { prevProps }: State) {
    const { get_products_by_filter, category_id } = props;

    if (prevProps) {
      if (category_id !== prevProps.category_id) {
        get_products_by_filter('', '', [], category_id, '', 1);
      }
    }

    return { prevProps: { category_id } };
  }

  componentDidMount = () => {
    const { get_products_by_filter, category_id } = this.props;

    get_products_by_filter('', '', [], category_id, '', 1);
  }

  render() {
    const { products, loading, error, message } = this.props;

    return (
      error ? (
        <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />
      ) : (
        <Row gutter={[16, 16]} style={{marginBottom: 20}}>
          {
            loading ?
              (new Array(9).fill(1)).map((_, index) => (
                <Col key={index} sm={8}>
                  <div className="box-shadow" style={{padding: 10}}><Skeleton active={true} paragraph={{rows: 4}} /></div>
                </Col>
              ))
            :
              products.length === 0 ?
                <Empty description="Không có sản phẩm" />
              :
                products.map((product) => (
                  <Col key={product._id} sm={8}>
                    <CardProductItem tag={true} type="new" product={product} />
                  </Col>
                ))
          }
        </Row>
      )
    )
  }
}

const descending_products_selector = descending_order_selector();
const mapStateToProps = (state: RootState) => {
  const { loading, errors, feedback } = state;

  return {
    products: descending_products_selector(state, 'products'),
    loading: create_loading_selector(['GET_PRODUCTS_BY_FILTER'])(loading),
    error: create_error_selector(['GET_PRODUCTS_BY_FILTER'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, {
  get_products_by_filter
})(Show);
