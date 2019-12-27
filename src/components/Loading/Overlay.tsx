import './Overlay.scss';

import React from 'react';
import { Spin } from 'antd';

interface Props {
  
}

const Overlay: React.FC<Props> = () => {
  return (
    <div className="overlay">
      <Spin size="large" />
    </div>
  )
}

export default Overlay;
