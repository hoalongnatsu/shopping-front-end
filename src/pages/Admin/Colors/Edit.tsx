import './Edit.scss';

import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Alert, Skeleton } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';

/* Interface */
import { RootState, ColorsState } from 'interface';

/* Constant */
import { FormType } from 'constant-app';

/* Services */
import { get_color_by_id } from 'services/colors';

/* Components */
const CreateEditColorForm = React.lazy(() => import('components/CreateEditForm/Color'));

interface StateToProps {
  colors: ColorsState[],
}

type Props = RouteComponentProps<{id: string}> & StateToProps;

interface State {
  color: ColorsState | null,
  loading: boolean,
  error: boolean,
  message: string
}

class Edit extends Component<Props, State> {
  state = {
    color: null,
    loading: true,
    error: false,
    message: ''
  }

  componentDidMount() {
    const { colors, match } = this.props;
    const { id } = match.params;

    const color = colors.find((color) => color._id === id);
    if (color) {
      this.setState({color, loading: false});
      return;
    }

    get_color_by_id(id).then((color) => {
      this.setState({color, loading: false});
    }).catch((e) => {
      this.setState({
        error: true,
        message: 'Something went wrong please try again later!'
      })
    })
  }

  render() {
    const { color, loading, error, message } = this.state;

    return error ? (
      <Alert message={message} type="error" closable={true} />
    ) : (
      <Suspense fallback={<Skeleton />}>
        <Skeleton loading={loading} active={true}>
          <CreateEditColorForm formType={FormType.EDIT} color={color} />
        </Skeleton>
      </Suspense>
    )
  }
}

const mapStateToProps = (state: RootState) => ({colors: state.colors});

export default connect(mapStateToProps)(withRouter(Edit));
