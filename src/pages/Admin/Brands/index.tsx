import './index.scss';

import React, { Component } from 'react';
import { Alert, Table, Icon, Skeleton, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Component */
import ContentAction from 'pages/Admin/Content/Action';

/* Interface */
import { RootState, BrandsState } from 'interface';

/* Actions */
import { get_all_brands, delete_brand } from 'actions/brands';

/* Helpers */
import {
  create_loading_selector,
  create_error_selector,
  descending_order_selector
} from 'helpers/selectors';

const { Column } = Table;
const { REACT_APP_IMAGE_URL, REACT_APP_SERVER_BRAND_IMAGE_FOLDER } = process.env;
const IMAGE_URL = `${REACT_APP_IMAGE_URL}/${REACT_APP_SERVER_BRAND_IMAGE_FOLDER}`;

interface ComponentProps {
  
}

interface StateToProps {
  brands: BrandsState[],
  loading: boolean,
  error: boolean,
  message: string
}

interface DispatchToProps {
  get_all_brands: () => void,
  delete_brand: (id: string) => void
}

type Props = ComponentProps & StateToProps & DispatchToProps;

interface State {
  
}

class Brands extends Component<Props, State> {
  state = {}

  componentDidMount() {
    const { brands, get_all_brands } = this.props;

    if (brands.length === 0) {
      get_all_brands()
    }
  }

  _confirm_delete_brand = (id: string) => {
    this.props.delete_brand(id);
  }

  _action = (text: any, record: any) => (
    <div className="table__action">
      <Link to={`/admin/brands/${record._id}/edit`}>
        <Icon type="edit" theme="filled" style={{color: "#6EB2FB", cursor: "pointer", fontSize: 16}} />
      </Link>
      <Popconfirm
        title="Are you sure delete this color?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => this._confirm_delete_brand(record._id)}
      >
        <Icon type="delete" theme="filled" style={{color: "#6EB2FB", cursor: "pointer", fontSize: 16}} />
      </Popconfirm>
    </div>
  )

  render() {
    const { brands, loading, error, message } = this.props;

    return (
      <Skeleton loading={loading} active={true}>
        <>
          {error && <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />}
          <ContentAction to="/admin/brands/create" />
          <div className="content-table">
            <Table dataSource={brands} rowKey={record => record.name} >
              <Column title="Name" dataIndex="name" key="name" />
              <Column
                title="Logo"
                dataIndex="logo"
                key="logo"
                render={(logo) => (
                  <img className="table__image" src={`${IMAGE_URL}/${logo}`} alt="logo" />
                )}
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

const descending_brands_selector = descending_order_selector();
const mapStateToProps = (state: RootState) => {
  const { loading, errors, feedback } = state;

  return {
    brands: descending_brands_selector(state, 'brands'),
    loading: create_loading_selector(['GET_BRANDS'])(loading),
    error: create_error_selector(['GET_BRANDS'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, { get_all_brands, delete_brand })(Brands);
