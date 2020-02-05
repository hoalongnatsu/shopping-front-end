import './Brand.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Typography, Form, Input, Alert } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { withRouter, RouteComponentProps } from 'react-router-dom';

/* Interface */
import { RootState, CategorySate } from 'interface';

/* Constant */
import { FormType } from 'constant-app';

/* Actions */
import { create_category, update_category } from 'actions/categories';

/* Helpers */
import { create_loading_selector, create_error_selector } from 'helpers/selectors';

const { Title } = Typography;

interface ComponentProps {
  formType: FormType,
  category?: CategorySate | null
}

interface StateToProps {
  loading: boolean,
  error: boolean,
  message: string
}

interface DispacthToProps {
  create_category: (brand: CategorySate, history: any) => void,
  update_category: (id: any, brand: CategorySate, history: any) => void,
}

type Props = FormComponentProps & RouteComponentProps & ComponentProps & StateToProps & DispacthToProps;

interface State {
  submitted: boolean
}

export class Category extends Component<Props, State> {
  state = {
    uploaded: false,
    submitted: false
  }

  componentDidMount() {
    const { formType, form } = this.props;
    
    if (formType === FormType.EDIT) {
      const { name } = this.props.category as CategorySate;
      form.setFieldsValue({name});
    }
  }

  _submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { form, history, formType, category, create_category, update_category } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        if (formType === FormType.CREATE) {
          create_category(values, history);
        } else {
          const id = category && category._id;
          update_category(id, values, history);
        }

        this.setState({submitted: true});
      }
    })
  }

  cancel = () => {
    this.props.history.push('/admin/categories');
  }

  render() {
    const { loading, error, message, formType } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { submitted } = this.state;

    return (
      <>
        {
          submitted && error && <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />
        }
        <Title level={3}>{formType === FormType.CREATE ? 'Create new' : 'Edit'} category</Title>
        <Form onSubmit={this._submit}>
          <Form.Item label="Category Name">
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: 'This field is required.' }]
              })(<Input placeholder="Enter Name" />)
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{marginTop: 12}} loading={loading}>
              {formType === FormType.CREATE ? 'Create' : 'Save'}
            </Button>
            {
              formType === FormType.EDIT &&
              <Button type="primary" htmlType="button" style={{marginLeft: 12}} onClick={this.cancel}>
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
    loading: create_loading_selector(['CREATE_CATEGORY', 'UPLOAD_CATEGORY'])(loading),
    error: create_error_selector(['CREATE_CATEGORY', 'UPLOAD_CATEGORY'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, {
  create_category,
  update_category
})(Form.create<FormComponentProps & ComponentProps>({name: 'Create Category'})(withRouter(Category)));
