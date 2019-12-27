import './Edit.scss';

import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Alert, Skeleton } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';

/* Interface */
import { RootState, BrandsState } from 'interface';

/* Constant */
import { FormType } from 'constant-app';

/* Services */
import { get_brand_by_id } from 'services/brands';

/* Components */
const CreateEditBrandForm = React.lazy(() => import('components/CreateEditForm/Brand'));

interface StateToProps {
  brands: BrandsState[],
}

type Props = RouteComponentProps<{id: string}> & StateToProps;

interface State {
  brand: BrandsState | null,
  loading: boolean,
  error: boolean,
  message: string
}

class Edit extends Component<Props, State> {
  state = {
    brand: null,
    loading: true,
    error: false,
    message: ''
  }

  componentDidMount() {
    const { brands, match } = this.props;
    const { id } = match.params;

    const brand = brands.find((brand) => brand._id === id);
    if (brand) {
      this.setState({brand, loading: false});
      return;
    }

    get_brand_by_id(id).then((brand) => {
      this.setState({brand, loading: false});
    }).catch((e) => {
      this.setState({
        error: true,
        message: 'Something went wrong please try again later!'
      })
    })
  }

  render() {
    const { brand, loading, error, message } = this.state;

    return error ? (
      <Alert message={message} type="error" closable={true} />
    ) : (
      <Suspense fallback={<Skeleton />}>
        <Skeleton loading={loading} active={true}>
          <CreateEditBrandForm formType={FormType.EDIT} brand={brand} />
        </Skeleton>
      </Suspense>
    )
  }
}

const mapStateToProps = (state: RootState) => ({brands: state.brands})

export default connect(mapStateToProps, null)(withRouter(Edit));
