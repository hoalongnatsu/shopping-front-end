import './index.scss';

import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import TweenOne from 'rc-tween-one';

interface Props {
  
}

interface State {
  
}

class ProductSearch extends Component<Props, State> {
  state = {}

  render() {
    return (
      <TweenOne
        className="product-search"
        animation={{top: '100%', ease: "easeInOutBack"}}
      >
        <Input
          className="product-search__input"
          prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
      </TweenOne>
    )
  }
}

export default ProductSearch;
