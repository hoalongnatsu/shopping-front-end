import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props {
  
}

const ScrollToTop: React.FC<Props & RouteComponentProps> = ({history}) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, [history]);

  return (null);
}

export default withRouter(ScrollToTop);
