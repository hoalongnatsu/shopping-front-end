import './index.scss';

import React, { Component } from 'react';
import { Alert, Table, Icon, Skeleton, Popconfirm, Switch } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Component */
import ContentAction from 'pages/Admin/Content/Action';

/* Interface */
import { RootState, ProductState } from 'interface';

/* Actions */
import { get_all_products, delete_product, toggle_hot_product, toggle_top_sale_product } from 'actions/products';

/* Helpers */
import {
  create_loading_selector,
  create_error_selector,
  descending_order_selector
} from 'helpers/selectors';
import { formatToCurrencyVND } from 'helpers/format';

const { Column } = Table;
const { REACT_APP_IMAGE_URL, REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER } = process.env;
const IMAGE_URL = `${REACT_APP_IMAGE_URL}/${REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER}`;

interface ComponentProps {
  
}

interface StateToProps {
  products: ProductState[],
  loading: boolean,
  toggle_hot_product_loading: boolean,
  toggle_top_sale_product_loading: boolean,
  error: boolean,
  message: string
}

interface DispatchProps {
  get_all_products: () => void,
  delete_product: (id: any) => void,
  toggle_hot_product: (id: any, hot: boolean) => void,
  toggle_top_sale_product: (id: any, top_sale: boolean) => void,
}

type Props = ComponentProps & StateToProps & DispatchProps;

interface State {
  currentClickItem: string
}

class Products extends Component<Props, State> {
  state = {
    currentClickItem: ''
  }

  componentDidMount() {
    const { products, get_all_products } = this.props;

    if (products.length === 0) {
      get_all_products();
    }
  }

  toggleAttributeProduct = (id: any, value: boolean, type: string) => {
    const { toggle_hot_product, toggle_top_sale_product } = this.props;
    this.setState({currentClickItem: id});
    if (type === 'hot') {
      toggle_hot_product(id, value);
    } else {
      toggle_top_sale_product(id, value);
    }
  }

  _renderImage = (image_cover: string) => {
    return (
      <img
        className="table__image"
        src={`${IMAGE_URL}/${image_cover}`}
        alt="Product"
      />
    )
  }

  _renderPrice = (price: number) => formatToCurrencyVND(price)

  _renderToggleButton = (text: any, record: ProductState, type: string) => {
    const { toggle_hot_product_loading, toggle_top_sale_product_loading } = this.props;
    const { currentClickItem } = this.state;

    return type === 'hot' ? (
      <Switch
        loading={toggle_hot_product_loading && currentClickItem === record._id}
        checked={record.hot}
        onClick={() => this.toggleAttributeProduct(record._id, record.hot, type)}
      />
    ) : (
      <Switch
        loading={toggle_top_sale_product_loading && currentClickItem === record._id}
        checked={record.top_sale}
        onClick={() => this.toggleAttributeProduct(record._id, record.top_sale, type)}
      />
    )
  }

  _confirmDeleteProduct = (id: string) => {
    this.props.delete_product(id);
  }

  _action = (text: any, record: any) => (
    <div className="table__action">
      <Link to={`/admin/products/${record._id}/edit`}>
        <Icon type="edit" theme="filled" style={{color: "#6EB2FB", cursor: "pointer", fontSize: 16}} />
      </Link>
      <Popconfirm
        title="Are you sure delete this color?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => this._confirmDeleteProduct(record._id)}
      >
        <Icon type="delete" theme="filled" style={{color: "#6EB2FB", cursor: "pointer", fontSize: 16}} />
      </Popconfirm>
    </div>
  )

  render() {
    const { products, loading, error, message } = this.props;

    return (
      <Skeleton loading={loading} active={true}>
      <>
        {error && <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />}
        <ContentAction to="/admin/products/create" />
        <div className="content-table">
          <Table dataSource={products} rowKey={record => record._id as string} >
            <Column
              title="Image"
              dataIndex="image_cover"
              key="image"
              render={this._renderImage}
            />
            <Column title="Name" dataIndex="name" key="name" />
            <Column
              title="Price"
              dataIndex="price"
              key="price"
              render={this._renderPrice}
            />
            <Column title="Category" dataIndex="category.name" key="category" />
            <Column title="Brand" dataIndex="brand.name" key="brand" />
            <Column
              title="Top Sale"
              key="top_sale"
              render={(text: any, record: ProductState) => this._renderToggleButton(text, record, 'top_sale')}
            />
            <Column
              title="Hot"
              key="hot"
              render={(text: any, record: ProductState) => this._renderToggleButton(text, record, 'hot')}
            />
            <Column
              title="Action"
              key="action"
              render={this._action}
            />
          </Table>
        </div>
      </>
    </Skeleton>
    )
  }
}

const descending_colors_selector = descending_order_selector();
const mapStateToProps = (state: RootState) => {
  const { loading, errors, feedback } = state;

  return {
    products: descending_colors_selector(state, 'products'),
    loading: create_loading_selector(['GET_PRODUCTS'])(loading),
    toggle_hot_product_loading: loading['TOGGLE_HOT_PRODUCT'],
    toggle_top_sale_product_loading: loading['TOGGLE_TOP_SALE_PRODUCT'],
    error: create_error_selector(['GET_PRODUCTS', 'DELETE_PRODUCT'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, {
  get_all_products,
  delete_product,
  toggle_hot_product,
  toggle_top_sale_product
})(Products);
