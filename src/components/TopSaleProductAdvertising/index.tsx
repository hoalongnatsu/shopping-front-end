import './index.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Tag, Typography, Skeleton, Alert } from 'antd';

/* Interface */
import { RootState, ProductState } from 'interface';

/* Actions */
import { get_top_sale_product } from 'actions/products';

/* Helpers */
import {
  create_loading_selector,
  create_error_selector,
} from 'helpers/selectors';
import { formatToCurrencyVND } from 'helpers/format';

const { REACT_APP_IMAGE_URL, REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER } = process.env;
const IMAGE_URL = `${REACT_APP_IMAGE_URL}/${REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER}`;

const { Title, Paragraph } = Typography;

interface ComponentProps {
  
}

interface StateToProps {
  top_sale_product: ProductState,
  loading: boolean,
  error: boolean,
  message: string
}

interface DispatchProps {
  get_top_sale_product: () => void
}

type Props = ComponentProps & StateToProps & DispatchProps;

interface State {
  
}

class TopSaleProductAdvertising extends Component<Props, State> {
  state = {}

  componentDidMount() {
    const { top_sale_product, get_top_sale_product } = this.props;
    
    if (Object.keys(top_sale_product).length === 0) {
      get_top_sale_product();
    }
  }

  render() {
    const { top_sale_product, loading, error, message } = this.props;

    return (
      <div className="top-sale-product-advertising">
        <Skeleton loading={loading} active={true} avatar={{shape: 'square'}}>
          {error && <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />}
          <div className="image">
            <Tag color="var(--color-primary)">TOP SALE</Tag>
            {top_sale_product.image_cover && <img src={`${IMAGE_URL}/${top_sale_product.image_cover}`} alt="Top Sale Product" />}
          </div>
          <div className="content">
            <Title level={3} ellipsis={true}>{top_sale_product.name}</Title>
            <p className="price">{formatToCurrencyVND(top_sale_product.price)}</p>
            <Paragraph ellipsis={{ rows: 3 }} className="desc">
              {top_sale_product.short_descripsion}
            </Paragraph>
            <Button
              type="primary"
              shape="round"
              size="large"
            >
              Xem chi tiết
            </Button>
          </div>
          </Skeleton>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { top_sale_product, loading, errors, feedback } = state;

  return {
    top_sale_product,
    loading: create_loading_selector(['GET_TOP_SALE_PRODUCT'])(loading),
    error: create_error_selector(['GET_TOP_SALE_PRODUCT'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, { get_top_sale_product })(TopSaleProductAdvertising);
