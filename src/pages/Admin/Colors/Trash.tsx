import './Trash.scss';

import React, { Component } from 'react';
import { Alert, Table, Icon, Skeleton, Popconfirm } from 'antd';
import { connect } from 'react-redux';

/* Interface */
import { RootState, ColorsState } from 'interface';

/* Actions */
import { get_trash_colors } from 'actions/trash';
import { restore_color, remove_color } from 'actions/colors';

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
  get_trash_colors: () => void,
  restore_color: (id: string) => void,
  remove_color: (id: string) => void,
}

type Props = ComponentProps & StateToProps & DispatchProps;

interface State {
  
}

class Trash extends Component<Props, State> {
  state = {}

  componentDidMount() {
    if (!this.props.colors.length) {
      this.props.get_trash_colors();
    }
  }

  _confirm_restore_color = (id: string) => {
    this.props.restore_color(id);
  }

  _confirm_remove_color = (id: string) => {
    this.props.remove_color(id);
  }

  _placeholder = (color: string) => (
    <Icon type="qq" style={{color, fontSize: 26}} />
  )

  _action = (text: any, record: any) => (
    <div className="table__action">
      <Popconfirm
        title="Are you sure restore this color?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => this._confirm_restore_color(record._id)}
      >
        <Icon type="rest" theme="filled" style={{color: "var(--color-blue)", cursor: "pointer", fontSize: 16}} />
      </Popconfirm>
      <Popconfirm
        title="Are you sure remove this color?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => this._confirm_remove_color(record._id)}
      >
        <Icon type="delete" theme="filled" style={{color: "var(--color-red)", cursor: "pointer", fontSize: 16}} />
      </Popconfirm>
    </div>
  )

  render() {
    const { colors, loading, error, message } = this.props;

    return (
      <Skeleton loading={loading} active={true}>
        <>
          {error && <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />}
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
  const { trash, loading, errors, feedback } = state;

  return {
    colors: trash.colors,
    loading: create_loading_selector(['GET_TRASH_COLORS'])(loading),
    error: create_error_selector(['GET_TRASH_COLORS', 'RESTORE_COLOR', 'REMOVE_COLOR'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, { get_trash_colors, restore_color, remove_color })(Trash);
