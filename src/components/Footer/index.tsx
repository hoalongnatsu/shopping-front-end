import './index.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

/* Components */
import Logo from 'components/Logo';

/* Interface */
import { RootState, CategoryState } from 'interface';

const { Title } = Typography;

interface ComponentProps {
  
}

interface StateToProps {
  categories: CategoryState[],
}

interface DispatchProps {
  
}

type Props = ComponentProps & StateToProps & DispatchProps;

const Footer: React.FC<Props> = ({categories}) => (
  <div className="footer">
    <div className="footer__container">
      <div className="footer__content">
        <div className="footer__item footer__logo">
          <Logo style={{width: 75}} />
        </div>
        <div className="footer__item">
          <Title level={4} className="title">Sản phẩm</Title>
          {
            categories.map((category) => (
              <p key={category._id} className="text"><Link to={`/products/category/${category.name}`}>{category.name}</Link></p>
            ))
          }
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

const mapStateToProps = (state: RootState) => {
  const { categories } = state;

  return {
    categories
  }
}

export default connect(mapStateToProps, {})(Footer);
