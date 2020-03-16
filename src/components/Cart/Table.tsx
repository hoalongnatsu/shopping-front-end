import './Table.scss';

import React, { Component } from 'react';
import { Table, Button, Input } from 'antd';

/* Helpers */
import { formatToCurrencyVND } from 'helpers/format';

const { Column } = Table;
const { REACT_APP_IMAGE_URL, REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER } = process.env;
const IMAGE_URL = `${REACT_APP_IMAGE_URL}/${REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER}`;
const cart = [
  {
    name: 'Colthes for Women 8',
    image_cover: '419b4cc4486fd7aaafedc87dfac32dfc',
    size: 'X',
    quantity: 2,
    price: 80000,
  },
  {
    name: 'Colthes for Women 6',
    image_cover: '419b4cc4486fd7aaafedc87dfac32dfc',
    size: 'X',
    quantity: 2,
    price: 80000,
  },
  {
    name: 'Colthes for Women 7',
    image_cover: '419b4cc4486fd7aaafedc87dfac32dfc',
    size: 'X',
    quantity: 2,
    price: 80000,
  },
]

interface Props {
  
}

interface State {
  
}

class CartTable extends Component<Props, State> {
  state = {}

  _renderImage = (image_cover: string) => {
    return (
      <img
        className="table__image"
        src={`${IMAGE_URL}/${image_cover}`}
        alt="Product"
      />
    )
  }

  _renderSize = (size: string) => {
    return (
      <div style={{marginLeft: 5}}>{size}</div>
    )
  }

  _renderQuantity = (quantity: number) => {
    return (
      <div className="quantity-form">
        <Button type="primary" shape="circle" icon="minus" />
        <Input name="quantity" value={quantity} />
        <Button type="primary" shape="circle" icon="plus" />
      </div>
    )
  }

  _renderPrice = (price: number) => formatToCurrencyVND(price)

  _renderFooter = (total: number) => {
    return (
      <div>Total - {formatToCurrencyVND(total)}</div>
    )
  }

  render() {
    return (
      <Table
        dataSource={cart}
        rowKey={record => record.name}
        pagination={false}
        scroll={{
          x: window.screen.width <= 768 ? 700 : false
        }}
        className="cart-table"
        footer={() => this._renderFooter(500)}
      >
        <Column title="Tên sản phẩm" dataIndex="name" key="name" />
        <Column
          title="Hình"
          dataIndex="image_cover"
          key="image"
          render={this._renderImage}
        />
        <Column
          title="Kích cỡ"
          dataIndex="size"
          key="size"
          render={this._renderSize}
        />
        <Column
          title="Số lượng"
          dataIndex="quantity"
          key="quantity"
          render={this._renderQuantity}
        />
        <Column
          title="Giá"
          dataIndex="price"
          key="price"
          render={this._renderPrice}
        />
      </Table>
    )
  }
}

export default CartTable;
