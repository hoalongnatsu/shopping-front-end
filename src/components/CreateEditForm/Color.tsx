import './Color.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Typography, Form, Input, Alert } from 'antd';
import { SketchPicker } from 'react-color';
import { FormComponentProps } from 'antd/es/form';
import { withRouter, RouteComponentProps } from 'react-router-dom';

/* Interface */
import { RootState, ColorsState } from 'interface';

/* Constant */
import { FormType } from 'constant-app';

/* Actions */
import { create_color, update_color } from 'actions/colors';

/* Helpers */
import { create_loading_selector, create_error_selector } from 'helpers/selectors';

const { Title } = Typography;

interface ComponentProps {
  formType: FormType,
  color?: ColorsState | null
}

interface StateToProps {
  loading: boolean,
  error: boolean,
  message: string
}

interface DispatchProps {
  create_color: (color: ColorsState, history: any) => void,
  update_color: (id: any, color: ColorsState, history: any) => void,
}

type Props = FormComponentProps & RouteComponentProps & ComponentProps & StateToProps & DispatchProps;

interface State {
  submitted: boolean
}

class Color extends Component<Props, State> {
  state = {
    submitted: false
  }

  componentDidMount() {
    const { formType, color, form } = this.props;
    
    if (formType === FormType.EDIT) {
      form.setFieldsValue({
        name: color && color.name,
        code: color && color.code
      })
    }
  }

  _submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { color, formType, form, create_color, update_color, history } = this.props;

    form.validateFields((err, values: ColorsState) => {
      if (!err) {
        if (formType === FormType.CREATE) {
          create_color(values, history);
        } else if (formType === FormType.EDIT) {
          const id = color && color._id;
          update_color(id, values, history);
        }

        this.setState({submitted: true});
      }
    })
  }

  _change = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.form.setFieldsValue({name: e.target.value});
  }

  _changeColor = ({ hex }: any) => {
    this.props.form.setFieldsValue({code: hex});
  }

  _cancel = () => {
    this.props.history.push('/admin/colors');
  }

  render() {
    const { loading, formType, error, message } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { submitted } = this.state;

    return (
      <>
        {
          submitted && error && <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />
        }
        <Title level={3}>{formType === FormType.CREATE ? 'Create new' : 'Edit'} color</Title>
        <Form onSubmit={this._submit}>
          <Form.Item label="Color Name">
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: 'This field is required.' }]
              })(<Input placeholder="Enter Name" onChange={this._change} />)
            }
          </Form.Item>
          <Form.Item label="Color Code">
            {
              getFieldDecorator('code', {
                rules: [{ required: true, message: 'This field is required.' }]
              })(<Input placeholder="Please Pick Color" disabled={true} />)
            }
          </Form.Item>
          <SketchPicker color={this.props.form.getFieldValue('code')} onChangeComplete={this._changeColor} />
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
    loading: create_loading_selector(['CREATE_COLOR', 'UPDATE_COLOR'])(loading),
    error: create_error_selector(['CREATE_COLOR', 'UPDATE_COLOR'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, {
  create_color,
  update_color
})(Form.create<FormComponentProps & ComponentProps>({name: 'Create Color'})(withRouter(Color)));
