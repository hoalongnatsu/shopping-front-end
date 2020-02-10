import './index.scss';

import React from 'react';
import { Typography, Input, Icon, Button } from 'antd';

const { Title } = Typography;

interface Props {
  
}

const Subscribtion: React.FC<Props> = () => (
  <div className="subscribtion">
    <div className="subscribtion__container">
      <Title className="subscribtion__title" level={2} style={{textTransform: "uppercase"}}>Nhận thông báo</Title>
      <p className="subscribtion__desc">
        Điền vào email của bạn để nhận thông tin về khuyến mãi và sản phẩm mới nhất
      </p>
      <div className="subscribtion__form">
        <Input prefix={<Icon type="mail" />} placeholder="Nhập địa chỉ của bạn" size="large" />
        <Button type="primary" size="large">Nhận thông báo</Button>
      </div>
    </div>
  </div>
)

export default Subscribtion;
