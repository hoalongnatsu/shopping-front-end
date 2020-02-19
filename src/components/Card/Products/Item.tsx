import './Item.scss';

import React, { Component } from 'react';
import { Typography, Select, Button, Icon, Tag } from 'antd';
import { Link } from 'react-router-dom';

/* Components */
import ColorsPlaceholder from 'components/ColorsPlaceholder';

/* Interface */
import { ProductState } from 'interface';

/* Helpers */
import { formatToCurrencyVND } from 'helpers/format';

const { Title } = Typography;
const { Option } = Select;
const { REACT_APP_IMAGE_URL, REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER } = process.env;
const IMAGE_URL = `${REACT_APP_IMAGE_URL}/${REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER}`;

interface Props {
  product: ProductState,
  tag?: boolean
  type?: "hot" | "new",
}

interface State {
  
}

class Item extends Component<Props, State> {
  state = {}

  render() {
    const { product, tag, type } = this.props;

    return (
      <div className="card-products__item">
        <div className="image">
          {tag && <Tag color={type === "hot" ? "var(--color-red)" : "var(--color-blue)"}>{type}</Tag>}
          <img src={`${IMAGE_URL}/${product.image_cover}`} alt="product" />
        </div>
        <div className="content">
          <Title level={4} ellipsis={true}>{product.name}</Title>
          <div className="price">{formatToCurrencyVND(product.price)}</div>
        </div>
        <div className="cover">
          <Title level={4} ellipsis={true} className="name">{product.name}</Title>
          <div className="price">{formatToCurrencyVND(product.price)}</div>
          <div className="colors">
            <ColorsPlaceholder colors={product.colors} setActive={(item) => console.log(item)} />
          </div>
          <div className="button">
            <Select style={{ width: 80 }} placeholder="Size">
              {
                product.props[product.colors[0]._id as string].size.map((size) => <Option key={size} value={size}>{size}</Option>)
              }
            </Select>
            <Button type="primary">Cho vào <Icon type="shopping-cart" /></Button>
          </div>
          <Link to="#product" className="view">Xem chi tiết</Link>
        </div>
      </div>
    )
  }
}

export default Item;
