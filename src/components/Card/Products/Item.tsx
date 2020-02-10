import './Item.scss';

import React, { Component } from 'react';
import { Typography, Select, Button, Icon, Tag } from 'antd';
import { Link } from 'react-router-dom';

/* Components */
import ColorsPlaceholder from 'components/ColorsPlaceholder';

const { Title } = Typography;
const { Option } = Select;
const { REACT_APP_IMAGE_URL, REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER } = process.env;
const IMAGE_URL = `${REACT_APP_IMAGE_URL}/${REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER}`;
const colors = [
  {
    _id: "5e22cd52c59dbb4ca84bf65d",
    name: "Orange",
    code: "#f5a623",
  },
  {
    _id: "5e22cd3dc59dbb4ca84bf65c",
    name: "Green",
    code: "#b8e986",
  },
  {
    _id: "5e22cce9c59dbb4ca84bf65b",
    name: "Blue",
    code: "#4a90e2",
  },
];
const sizes = ['S', 'M', 'XL'];

interface Props {
  tag?: boolean
  type?: "hot" | "new",
}

interface State {
  
}

class Item extends Component<Props, State> {
  state = {}

  render() {
    const { tag, type } = this.props;

    return (
      <div className="card-products__item">
        <div className="image">
          {tag && <Tag color={type === "hot" ? "var(--color-red)" : "var(--color-blue)"}>{type}</Tag>}
          <img src={`${IMAGE_URL}/product-demo.jpg`} alt="product" />
        </div>
        <div className="content">
          <Title level={4} ellipsis={true}>Europe Street beat</Title>
          <div className="price">100.000đ</div>
        </div>
        <div className="cover">
          <Title level={4} ellipsis={true} className="name">Europe Street beat</Title>
          <div className="price">100.000đ</div>
          <div className="colors">
            <ColorsPlaceholder colors={colors} setActive={(item) => console.log(item)} />
          </div>
          <div className="button">
            <Select style={{ width: 80 }} placeholder="Size">
              {
                sizes.map((size) => <Option key={size} value={size}>{size}</Option>)
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
