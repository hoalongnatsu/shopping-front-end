import './Create.scss';

import React, { Component , Suspense } from 'react';
import { Skeleton } from 'antd';

/* Constant */
import { FormType } from 'constant-app';

/* Components */
const CreateEditColorForm = React.lazy(() => import('components/CreateEditForm/Color'));

interface StateToProps {
  error: boolean,
  message: string
}

type Props = StateToProps;

interface State {
  
}

class Create extends Component<Props, State> {
  state = {}

  render() {
    return (
      <Suspense fallback={<Skeleton />}>
        <CreateEditColorForm formType={FormType.CREATE} />
      </Suspense>
    )
  }
}

export default Create;
