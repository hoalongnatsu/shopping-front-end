import './App.scss';

import React, { Component } from 'react';

/* Components */
import Topbar from 'components/Topbar';
import Footer from 'components/Footer';

interface Props {
  
}

interface State {
  
}

class App extends Component<Props, State> {
  state = {}

  render() {
    return (
      <>
        <Topbar />
        {this.props.children}
        <Footer />
      </>
    )
  }
}

export default App;
