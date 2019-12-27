import './index.scss';

import React, { Component } from 'react';
import { Alert, Table, Icon, Skeleton, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Component */
import ContentAction from 'pages/Admin/Content/Action';

/* Interface */
import { RootState, ColorsState } from 'interface';

/* Actions */
import { get_all_colors, delete_color } from 'actions/colors';

/* Helpers */
import { create_loading_selector, create_error_selector } from 'helpers/selectors';

const { Column } = Table;

interface ComponentProps {
  
}

interface StateToProps {
  colors: ColorsState[],
  loading: boolean,
  error: boolean,
  message: string
}

interface DispatchProps {
  get_all_colors: () => void,
  delete_color: (_id: string) => void,
}

type Props = ComponentProps & StateToProps & DispatchProps;

interface State {
  
}

class Colors extends Component<Props, State> {
  state = {}

  componentDidMount() {
    if (!this.props.colors.length) {
      this.props.get_all_colors();
    }
  }

  _confirm_delete_color = (id: string) => {
    this.props.delete_color(id);
  }

  _placeholder = (color: string) => (
    <Icon type="qq" style={{color, fontSize: 26}} />
  )

  _action = (text: any, record: any) => (
    <div className="table__action">
      <Link to={`/colors/${record._id}/edit`}>
        <Icon type="edit" theme="filled" style={{color: "#6EB2FB", cursor: "pointer", fontSize: 16}} />
      </Link>
      <Popconfirm
        title="Are you sure delete this color?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => this._confirm_delete_color(record._id)}
      >
        <Icon type="delete" theme="filled" style={{color: "#6EB2FB", cursor: "pointer", fontSize: 16}} />
      </Popconfirm>
    </div>
  )

  render() {
    const { colors, loading, error, message } = this.props;

    return (
      <Skeleton loading={loading} active={true}>
        <>
          {error && <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />}
          <ContentAction to="/colors/create" />
          <div className="content-table">
            <Table dataSource={colors} rowKey={record => record.code} >
              <Column title="Name" dataIndex="name" key="name" />
              <Column title="Color Code" dataIndex="code" key="code" />
              <Column
                title="Color Placeholder"
                dataIndex="code"
                key="placeholder"
                render={this._placeholder}
              />
              <Column
                title="Action"
                key="action"
                render={this._action}
              />
            </Table>
          </div>
        </>
      </Skeleton>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { colors, loading, errors, feedback } = state;

  return {
    colors: colors,
    loading: create_loading_selector(['GET_COLORS'])(loading),
    error: create_error_selector(['GET_COLORS', 'DELETE_COLOR'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, { get_all_colors, delete_color })(Colors);
