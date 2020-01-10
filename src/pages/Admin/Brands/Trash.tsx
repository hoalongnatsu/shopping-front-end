import './Trash.scss';

import React, { Component } from 'react';
import { Alert, Table, Icon, Skeleton, Popconfirm } from 'antd';
import { connect } from 'react-redux';

/* Interface */
import { RootState, BrandsState } from 'interface';

/* Actions */
import { get_trash_brands } from 'actions/trash';
import { restore_brand, remove_brand } from 'actions/brands';

/* Helpers */
import { create_loading_selector, create_error_selector } from 'helpers/selectors';

const { Column } = Table;
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

interface ComponentProps {
  
}

interface StateToProps {
  brands: BrandsState[],
  loading: boolean,
  error: boolean,
  message: string
}

interface DispatchToProps {
  get_trash_brands: () => void,
  restore_brand: (id: string) => void,
  remove_brand: (id: string) => void,
}

type Props = ComponentProps & StateToProps & DispatchToProps;

interface State {
  
}

class Brands extends Component<Props, State> {
  state = {}

  componentDidMount() {
    const { brands, get_trash_brands } = this.props;
    if (brands.length === 0) {
      get_trash_brands()
    }
  }

  _confirm_restore_color = (id: string) => {
    this.props.restore_brand(id);
  }

  _confirm_remove_color = (id: string) => {
    this.props.remove_brand(id);
  }

  _action = (text: any, record: any) => (
    <div className="table__action">
      <Popconfirm
        title="Are you sure restore this brand?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => this._confirm_restore_color(record._id)}
      >
        <Icon type="rest" theme="filled" style={{color: "var(--color-blue)", cursor: "pointer", fontSize: 16}} />
      </Popconfirm>
      <Popconfirm
        title="Are you sure remove this brand?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => this._confirm_remove_color(record._id)}
      >
        <Icon type="delete" theme="filled" style={{color: "var(--color-red)", cursor: "pointer", fontSize: 16}} />
      </Popconfirm>
    </div>
  )

  render() {
    const { brands, loading, error, message } = this.props;

    return (
      <Skeleton loading={loading} active={true}>
        <>
          {error && <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />}
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

const mapStateToProps = (state: RootState) => {
  const { trash, loading, errors, feedback } = state;

  return {
    brands: trash.brands,
    loading: create_loading_selector(['GET_TRASH_BRANDS'])(loading),
    error: create_error_selector(['GET_TRASH_BRANDS', 'RESTORE_BRAND', 'REMOVE_BRAND'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, { get_trash_brands, restore_brand,remove_brand })(Brands);
