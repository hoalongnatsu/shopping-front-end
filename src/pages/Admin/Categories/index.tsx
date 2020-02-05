import './index.scss';

import React, { Component } from 'react';
import { Alert, Table, Icon, Skeleton, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Component */
import ContentAction from 'pages/Admin/Content/Action';

/* Interface */
import { RootState, CategorySate } from 'interface';

/* Actions */
import { get_all_categories, delete_category } from 'actions/categories';

/* Helpers */
import {
  create_loading_selector,
  create_error_selector,
  descending_order_selector
} from 'helpers/selectors';

const { Column } = Table;

interface ComponentProps {
  
}

interface StateToProps {
  categories: CategorySate[],
  loading: boolean,
  error: boolean,
  message: string
}

interface DispatchToProps {
  get_all_categories: () => void,
  delete_category: (id: string) => void
}

type Props = ComponentProps & StateToProps & DispatchToProps;

interface State {
  
}

class Categories extends Component<Props, State> {
  state = {}

  componentDidMount() {
    const { categories, get_all_categories } = this.props;

    if (categories.length === 0) {
      get_all_categories();
    }
  }

  _confirm_delete_category = (id: string) => {
    this.props.delete_category(id);
  }

  _action = (text: any, record: any) => (
    <div className="table__action">
      <Link to={`/admin/categories/${record._id}/edit`}>
        <Icon type="edit" theme="filled" style={{color: "#6EB2FB", cursor: "pointer", fontSize: 16}} />
      </Link>
      <Popconfirm
        title="Are you sure delete this category?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => this._confirm_delete_category(record._id)}
      >
        <Icon type="delete" theme="filled" style={{color: "#6EB2FB", cursor: "pointer", fontSize: 16}} />
      </Popconfirm>
    </div>
  )

  render() {
    const { categories, loading, error, message } = this.props;

    return (
      <Skeleton loading={loading} active={true}>
        <>
          {error && <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />}
          <ContentAction to="/admin/categories/create" />
          <div className="content-table">
            <Table dataSource={categories} rowKey={record => record._id as string} >
              <Column title="Name" dataIndex="name" key="name" />
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

const descending_categories_selector = descending_order_selector();
const mapStateToProps = (state: RootState) => {
  const { loading, errors, feedback } = state;

  return {
    categories: descending_categories_selector(state, 'categories'),
    loading: create_loading_selector(['GET_CATEGORIES'])(loading),
    error: create_error_selector(['GET_CATEGORIES'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, { get_all_categories, delete_category })(Categories);
