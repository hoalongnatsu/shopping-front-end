import './Trash.scss';

import React, { Component } from 'react';
import { Alert, Table, Icon, Skeleton, Popconfirm } from 'antd';
import { connect } from 'react-redux';

/* Interface */
import { RootState, ProductState } from 'interface';

/* Actions */
import { get_trash_products } from 'actions/trash';
import { restore_product, remove_product } from 'actions/products';

/* Helpers */
import {
  create_loading_selector,
  create_error_selector,
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
  get_trash_products: () => void,
  restore_product: (id: string) => void,
  remove_product: (id: string) => void,
}

type Props = ComponentProps & StateToProps & DispatchProps;

interface State {
  
}

class Trash extends Component<Props, State> {
  state = {}

  componentDidMount() {
    const { products, get_trash_products } = this.props;

    if (products.length === 0) {
      get_trash_products();
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

  _confirm_restore_color = (id: string) => {
    this.props.restore_product(id);
  }

  _confirm_remove_color = (id: string) => {
    this.props.remove_product(id);
  }

  _placeholder = (color: string) => (
    <Icon type="qq" style={{color, fontSize: 26}} />
  )

  _action = (text: any, record: any) => (
    <div className="table__action">
      <Popconfirm
        title="Are you sure restore this color?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => this._confirm_restore_color(record._id)}
      >
        <Icon type="rest" theme="filled" style={{color: "var(--color-blue)", cursor: "pointer", fontSize: 16}} />
      </Popconfirm>
      <Popconfirm
        title="Are you sure remove this color?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => this._confirm_remove_color(record._id)}
      >
        <Icon type="delete" theme="filled" style={{color: "var(--color-red)", cursor: "pointer", fontSize: 16}} />
      </Popconfirm>
    </div>
  )

  render() {
    const { products, loading, error, message } = this.props;

    return (
      <Skeleton loading={loading} active={true}>
        <>
          {error && <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />}
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

const mapStateToProps = (state: RootState) => {
  const { trash, loading, errors, feedback } = state;

  return {
    products: trash.products,
    loading: create_loading_selector(['GET_TRASH_PRODUCTS'])(loading),
    error: create_error_selector(['GET_TRASH_PRODUCTS', 'RESTORE_PRODUCT', 'REMOVE_PRODUCT'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, { get_trash_products, restore_product, remove_product })(Trash);
