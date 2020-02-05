import './Edit.scss';

import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Alert, Skeleton } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';

/* Interface */
import { RootState, CategorySate } from 'interface';

/* Constant */
import { FormType } from 'constant-app';

/* Services */
import { get_category_by_id } from 'services/categories';

/* Components */
const CreateEditCategoryForm = React.lazy(() => import('components/CreateEditForm/Category'));

interface StateToProps {
  categories: CategorySate[],
}

type Props = RouteComponentProps<{id: string}> & StateToProps;

interface State {
  category: CategorySate | null,
  loading: boolean,
  error: boolean,
  message: string
}

class Edit extends Component<Props, State> {
  state = {
    category: null,
    loading: true,
    error: false,
    message: ''
  }

  componentDidMount() {
    const { categories, match } = this.props;
    const { id } = match.params;

    const category = categories.find((category) => category._id === id);
    if (category) {
      this.setState({category, loading: false});
      return;
    }

    get_category_by_id(id).then((category) => {
      this.setState({category, loading: false});
    }).catch((e) => {
      this.setState({
        error: true,
        message: 'Something went wrong please try again later!'
      })
    })
  }

  render() {
    const { category, loading, error, message } = this.state;

    return error ? (
      <Alert message={message} type="error" closable={true} />
    ) : (
      <Suspense fallback={<Skeleton />}>
        <Skeleton loading={loading} active={true}>
          <CreateEditCategoryForm formType={FormType.EDIT} category={category} />
        </Skeleton>
      </Suspense>
    )
  }
}

const mapStateToProps = (state: RootState) => ({categories: state.categories})

export default connect(mapStateToProps, null)(withRouter(Edit));
