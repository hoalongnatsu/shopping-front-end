import './index.scss';

import React from 'react';
import { Link } from 'react-router-dom';

// const { REACT_APP_IMAGE_URL, REACT_APP_SERVER_BANNER_IMAGE_FOLDER } = process.env;
// const IMAGE_URL = `${REACT_APP_IMAGE_URL}/${REACT_APP_SERVER_BANNER_IMAGE_FOLDER}`;

interface Props {
  
}

const Banner: React.FC<Props> = () => (
  <div className="banner">
    <div className="banner__content">
      <div className="text">Phong cách thời trang độc đáo</div>
      <div className="button">
        <Link className="custom-btn" to="/products/category/all">Xem ngay</Link>
      </div>
    </div>
  </div>
)

export default Banner;
