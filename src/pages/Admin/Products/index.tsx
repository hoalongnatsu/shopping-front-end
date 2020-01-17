import './index.scss';

import React, { Component } from 'react';

/* Component */
import ContentAction from 'pages/Admin/Content/Action';

interface Props {
  
}
interface State {
  
}

class Products extends Component<Props, State> {
  state = {}

  render() {
    return (
      <>
        <ContentAction to="/admin/products/create" />
      </>
    )
  }
}

export default Products;
