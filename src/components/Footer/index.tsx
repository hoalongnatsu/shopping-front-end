import './index.scss';

import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

/* Components */
import Logo from 'components/Logo';

const { Title } = Typography;

interface Props {
  
}

const Footer: React.FC<Props> = () => (
  <div className="footer">
    <div className="footer__container">
      <div className="footer__content">
        <div className="footer__item footer__logo">
          <Logo style={{width: 75}} />
        </div>
        <div className="footer__item">
          <Title level={4} className="title">Sản phẩm</Title>
          <p className="text"><Link to="/">Áo</Link></p>
          <p className="text">Quần</p>
          <p className="text">Đầm</p>
        </div>
        <div className="footer__item">
          <Title level={4} className="title">Thông tin liên lạc</Title>
          <p className="text">Email</p>
          <p className="text">Sdt</p>
        </div>
        <div className="footer__item">
          <Title level={4} className="title">Mạng xã hội</Title>
        </div>
      </div>
      <hr />
      <div className="copyright">
        @2020, LHTV - About Us
      </div>
    </div>
  </div>
)

export default Footer;
