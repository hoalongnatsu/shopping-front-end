import './Table.scss';

import React, { Component } from 'react';
import { Table } from 'antd';

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

  render() {
    return (
      <Table
        dataSource={cart}
        rowKey={record => record.name}
        pagination={false}
        scroll={{
          x: window.screen.width <= 768 ? 700 : false
        }}
      >
        <Column title="Item" dataIndex="name" key="name" />
        <Column
          title="Image"
          dataIndex="image_cover"
          key="image"
          render={this._renderImage}
        />
        <Column title="Size" dataIndex="size" key="size" />
        <Column title="Quantity" dataIndex="quantity" key="quantity" />
        <Column title="Price" dataIndex="price" key="price" />
      </Table>
    )
  }
}

export default CartTable;
