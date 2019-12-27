import './App.scss';

import React, { Component, Fragment } from 'react';

/* Components */
import Topbar from 'components/Topbar';

interface Props {
  
}

interface State {
  
}

class App extends Component<Props, State> {
  state = {}

  render() {
    return (
      <Fragment>
        <Topbar />
        {this.props.children}
      </Fragment>
    )
  }
}

export default App;
