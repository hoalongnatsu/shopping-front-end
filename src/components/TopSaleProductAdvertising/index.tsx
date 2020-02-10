import './index.scss';

import React from 'react';
import { Button, Tag, Typography } from 'antd';

const { REACT_APP_IMAGE_URL, REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER } = process.env;
const IMAGE_URL = `${REACT_APP_IMAGE_URL}/${REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER}`;

const { Title, Paragraph } = Typography;

interface Props {
  
}

const TopSaleProductAdvertising: React.FC<Props> = () => (
  <div className="top-sale-product-advertising">
    <div className="image">
      <Tag color="var(--color-primary)">TOP SALE</Tag>
      <img src={`${IMAGE_URL}/product-demo.jpg`} alt="Top Sale Product" />
    </div>
    <div className="content">
      <Title level={3} ellipsis={true}>Vera Bradley</Title>
      <p className="price">100.000đ</p>
      <Paragraph ellipsis={{ rows: 3 }} className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sunt accusantium aperiam quam maxime exercitationem, consequuntur officiis quas est saepe cum doloribus repellat nam libero optio sint blanditiis sit et!</Paragraph>
      <Button
        type="primary"
        shape="round"
        size="large"
      >
        Cho vào giỏ hàng
      </Button>
    </div>
  </div>
)

export default TopSaleProductAdvertising;
