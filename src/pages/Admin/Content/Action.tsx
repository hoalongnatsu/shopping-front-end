import './Action.scss';

import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';

interface ComponentProps {
  to: string
}

type Props = RouteComponentProps & ComponentProps;

const Action: React.FC<Props> = ({to, history}) => {

  function _change(): void {
    history.push(to)
  }

  return (
    <div className="content-action">
      <Button type="primary" icon="plus" onClick={_change}>Create new</Button>
    </div>
  )
}

export default withRouter(Action);