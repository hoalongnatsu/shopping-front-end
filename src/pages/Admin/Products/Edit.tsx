import './Edit.scss';

import React, { Component, Suspense } from 'react';
import { Alert, Skeleton } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';

/* Interface */
import { ProductState } from 'interface';

/* Constant */
import { FormType } from 'constant-app';

/* Services */
import { get_product_by_id } from 'services/products';

/* Components */
const CreateEditProductForm = React.lazy(() => import('components/CreateEditForm/Product'));

interface ComponentProps {
  
}

type Props = RouteComponentProps<{id: string}> & ComponentProps;

interface State {
  product: ProductState | null,
  loading: boolean,
  error: boolean,
  message: string
}

class Edit extends Component<Props, State> {
  state = {
    product: null,
    loading: true,
    error: false,
    message: ''
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    get_product_by_id(id).then((product) => {
      this.setState({product, loading: false});
    }).catch((e) => {
      this.setState({
        error: true,
        message: 'Something went wrong please try again later!'
      })
    })
  }

  render() {
    const { product, loading, error, message } = this.state;

    return error ? (
      <Alert message={message} type="error" closable={true} />
    ) : (
      <Suspense fallback={<Skeleton />}>
        <Skeleton loading={loading} active={true}>
          <CreateEditProductForm formType={FormType.EDIT} product={product} />
        </Skeleton>
      </Suspense>
    )
  }
}

export default withRouter(Edit);
