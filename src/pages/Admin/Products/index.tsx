import './index.scss';

import React, { Component } from 'react';
import { Alert, Table, Icon, Skeleton, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Component */
import ContentAction from 'pages/Admin/Content/Action';

/* Interface */
import { RootState, ProductState, ProductProps } from 'interface';

/* Actions */
import { get_all_products, delete_product } from 'actions/products';

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
  error: boolean,
  message: string
}

interface DispatchProps {
  get_all_products: () => void,
  delete_product: (id: any) => void
}

type Props = ComponentProps & StateToProps & DispatchProps;

interface State {
  
}

class Products extends Component<Props, State> {
  state = {}

  componentDidMount() {
    const { products, get_all_products } = this.props;

    if (products.length === 0) {
      get_all_products();
    }
  }

  _renderImage = (productProps: ProductProps) => {
    return (
      <img
        className="table__image"
        src={`${IMAGE_URL}/${productProps[Object.keys(productProps)[0]].images[0]}`}
        alt="Product"
      />
    )
  }

  _renderPrice = (price: number) => formatToCurrencyVND(price)

  _confirm_delete_product = (id: string) => {
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
        onConfirm={() => this._confirm_delete_product(record._id)}
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
              dataIndex="props"
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
            <Column title="Brand" dataIndex="brand.name" key="brand" />
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
    loading: create_loading_selector(['GET_COLORS'])(loading),
    error: create_error_selector(['GET_COLORS', 'DELETE_COLOR'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, { get_all_products, delete_product })(Products);
