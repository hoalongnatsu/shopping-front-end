import './Create.scss';

import React, { Component, Suspense } from 'react';
import { Skeleton } from 'antd';

/* Constant */
import { FormType } from 'constant-app';

/* Components */
const CreateEditProductForm = React.lazy(() => import('components/CreateEditForm/Product'));

interface Props {
  
}

interface State {
  
}

class Create extends Component<Props, State> {
  state = {}

  render() {
    return (
      <Suspense fallback={<Skeleton />}>
        <CreateEditProductForm formType={FormType.CREATE} />
      </Suspense>
    )
  }
}

export default Create;
