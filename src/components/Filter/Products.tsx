import './Products.scss';

import React, { Component } from 'react';
import { Typography, Slider, Radio, Button } from 'antd';

/* Components */
import ColorsPlaceholder from 'components/ColorsPlaceholder';
import Size from 'components/Size';

/* Helpers */
import { formatToCurrencyVND } from 'helpers/format';

/* Interface */
import { CategoryState } from 'interface';

/* Constant */
import { SIZE } from 'constant-app';

const { Title } = Typography;
const colors = [
  {
    _id: "5e22cd52c59dbb4ca84bf65d",
    name: "Orange",
    code: "#f5a623"
  },
  {
    _id: "5e22cd3dc59dbb4ca84bf65c",
    name: "Green",
    code: "#b8e986",
  },
  {
    _id: "5e22cce9c59dbb4ca84bf65b",
    name: "Blue",
    code: "#4a90e2"
  }
]

interface Props {
  categories: CategoryState[]
}

interface State {
  
}

class Products extends Component<Props, State> {
  state = {}

  render() {
    const { categories } = this.props;

    return (
      <div className="filter-product box-shadow">
        <div className="colors">
          <Title level={4}>Màu</Title>
          <ColorsPlaceholder colors={colors} setActive={(item) => console.log(item)} />
        </div>
        <div className="size">
          <Title level={4}>Kích cỡ</Title>
          <Size size={SIZE} setActive={(item) => console.log(item)} />
        </div>
        <div className="price">
          <Title level={4}>Giá trong khoảng</Title>
          <Slider
            range={true}
            min={50000}
            max={1000000}
            defaultValue={[50000, 500000]}
            tooltipVisible={true}
            tipFormatter={formatToCurrencyVND}
            tooltipPlacement="bottomLeft"
            step={10000}
          />
        </div>
        <div className="category">
          <Title level={4}>Loại</Title>
          <Radio.Group>
            {
              categories.map((category) => <Radio key={category._id} value={category._id}>{category.name}</Radio>)
            }
          </Radio.Group>
        </div>
        <div className="brand">
          <Title level={4}>Thương hiệu</Title>
          <Radio.Group>
            <Radio value={1}>Viettien</Radio>
            <Radio value={2}>Gucci</Radio>
            <Radio value={3}>Hunter</Radio>
          </Radio.Group>
        </div>
        <hr />
        <div className="button">
          <Button type="primary" shape="round">Lọc sản phẩm</Button>
          <Button type="danger" ghost={true} shape="round">Xóa</Button>
        </div>
      </div>
    )
  }
}

export default Products;
