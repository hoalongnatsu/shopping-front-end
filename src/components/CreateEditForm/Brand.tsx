import './Brand.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Typography, Form, Input, Upload, Icon, Alert } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { withRouter, RouteComponentProps } from 'react-router-dom';

/* Interface */
import { RootState, BrandsState } from 'interface';

/* Constant */
import { FormType } from 'constant-app';

/* Actions */
import { create_brand, update_brand } from 'actions/brands';

/* Helpers */
import { create_loading_selector, create_error_selector } from 'helpers/selectors';

const { Title } = Typography;
const API = process.env.REACT_APP_API_URL;
const { REACT_APP_IMAGE_URL, REACT_APP_SERVER_BRAND_IMAGE_FOLDER } = process.env;
const IMAGE_URL = `${REACT_APP_IMAGE_URL}/${REACT_APP_SERVER_BRAND_IMAGE_FOLDER}`;

interface ComponentProps {
  formType: FormType,
  brand?: BrandsState | null
}

interface StateToProps {
  loading: boolean,
  error: boolean,
  message: string
}

interface DispacthToProps {
  create_brand: (brand: BrandsState, history: any) => void,
  update_brand: (id: any, brand: BrandsState, history: any) => void,
}

type Props = FormComponentProps & RouteComponentProps & ComponentProps & StateToProps & DispacthToProps;

interface State {
  uploaded: boolean,
  submitted: boolean
}

export class Brand extends Component<Props, State> {
  state = {
    uploaded: false,
    submitted: false
  }

  componentDidMount() {
    const { formType, form } = this.props;
    
    if (formType === FormType.EDIT) {
      const { name } = this.props.brand as BrandsState;
      form.setFieldsValue({name});
    }
  }

  _change = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.form.setFieldsValue({name: e.target.value});
  }

  _submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { form, history, formType, brand, create_brand, update_brand } = this.props;

    form.validateFields((err, {name, logo: logos}) => {
      if (!err) {
        let logo, newBrand: BrandsState;

        if (logos && logos[0].status === 'done') {
          logo = logos[0].response.filename;
          newBrand = { name, logo };
        } else {
          newBrand = { name };
        }

        if (logo && formType === FormType.CREATE) {
          create_brand(newBrand, history);
        } else if (formType === FormType.EDIT) {
          const id = brand && brand._id;
          update_brand(id, newBrand, history);
        }

        this.setState({submitted: true});
      }
    })
  }

  _getFilePreview = (e: any) => {
    if (e.fileList.length === 0) {
      this.setState({uploaded: false})
    } else {
      this.setState({uploaded: true})
    }

    return e && e.fileList;
  }

  _cancel = () => {
    this.props.history.push('/admin/brands');
  }

  render() {
    const { loading, error, message, formType, brand } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { uploaded, submitted } = this.state;

    return (
      <>
        {
          submitted && error && <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />
        }
        <Title level={3}>{formType === FormType.CREATE ? 'Create new' : 'Edit'} brand</Title>
        <Form onSubmit={this._submit}>
          <Form.Item label="Brand Name">
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: 'This field is required.' }]
              })(<Input placeholder="Enter Name" onChange={this._change} />)
            }
          </Form.Item>
          {
            formType === FormType.EDIT && brand &&
            <Form.Item label="Logo">
              <img style={{width: 150, border: '1px solid #d9d9d9'}} alt="example" src={`${IMAGE_URL}/${brand.logo}`} />
            </Form.Item>
          }
          <Form.Item label={FormType.CREATE ? 'Brand Logo' : 'New logo'}>
            {
              getFieldDecorator('logo', {
                valuePropName: 'fileList',
                getValueFromEvent: this._getFilePreview,
              })(
                <Upload
                  name="logo"
                  action={`${API}/photos/upload`}
                  listType="picture"
                >
                  <Button disabled={uploaded}>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{marginTop: 12}} loading={loading}>
              {formType === FormType.CREATE ? 'Create' : 'Save'}
            </Button>
            {
              formType === FormType.EDIT &&
              <Button type="primary" htmlType="button" style={{marginLeft: 12}} onClick={this._cancel}>
                Cancel
              </Button>
            }
          </Form.Item>
        </Form>
      </>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { loading, errors, feedback } = state;

  return {
    loading: create_loading_selector(['CREATE_BRAND', 'UPLOAD_BRAND'])(loading),
    error: create_error_selector(['CREATE_BRAND', 'UPLOAD_BRAND'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, {
  create_brand,
  update_brand
})(Form.create<FormComponentProps & ComponentProps>({name: 'Create Brand'})(withRouter(Brand)));
