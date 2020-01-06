import './index.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Form, Input, Icon, Card, Button, Checkbox, Alert } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

/* Interface */
import { RootState } from 'interface';

/* Actions */
import { login, register } from 'actions/user';

/* Helpers */
import { create_loading_selector, create_error_selector } from 'helpers/selectors';

/* Enum */
import { AuthForm } from 'constant-app';

const { Title } = Typography;

interface ComponentProps {
  
}

interface StateToProps {
  loading: boolean,
  error: boolean,
  message: string
}

interface DispacthToProps {
  login: (values: any, history: any) => void
  register: (values: any, history: any) => void
}

type Props = FormComponentProps & RouteComponentProps & ComponentProps & StateToProps & DispacthToProps;

interface State {
  submitted: boolean,
  form: AuthForm
}

class Login extends Component<Props, State> {
  state = {
    submitted: false,
    form: AuthForm.LOGIN
  }

  componentDidMount() {
    if(localStorage.getItem('jwt')) {
      this.props.history.push('/');
    }
  }

  _change = () => {
    const { submitted } = this.state;
    if (submitted) this.setState({submitted: false});
  }

  _changeForm = () => {
    const { form } = this.state;
    if (form === AuthForm.LOGIN) {
      this.setState({form: AuthForm.REGISTER});
      return;
    }

    this.setState({form: AuthForm.LOGIN});
  }

  _submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { form: formType } = this.state;
    const { form, login, register, history } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        if (formType === AuthForm.LOGIN) {
          login(values, history);
        } else {
          register(values, history);
        }

        this.setState({submitted: true})
      }
    })
  }

  render() {
    const { loading, error, message } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { submitted, form } = this.state;

    return (
      <section className="auth-page">
        <Card className="form-container">
          <Title level={3} className="title">{form}</Title>
          {
            submitted && error && <Alert message={message} type="error" style={{marginBottom: 12}} />
          }
          <Form onSubmit={this._submit}>
            <Form.Item>
              {
                getFieldDecorator('username', {
                  rules: [{ required: true, message: 'This field is required.' }]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    onChange={this._change}
                  />
                )
              }
            </Form.Item>
            {
              form === AuthForm.REGISTER &&
              <Form.Item>
                {
                  getFieldDecorator('email', {
                    rules: [{ required: true, message: 'This field is required.' }]
                  })(
                    <Input
                      prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Email"
                      onChange={this._change}
                    />
                  )
                }
              </Form.Item>
            }
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [{ required: true, message: 'This field is required.' }]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Password"
                    type="password"
                    onChange={this._change}
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)
              }
              {
                form === AuthForm.LOGIN && <Link to="/" className="login-form-forgot">
                  Forgot password
                </Link>
              }
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                {form === AuthForm.LOGIN ? 'Log in' : 'Register now'}
              </Button>
              Or
              <span
                className="login-form-type"
                onClick={this._changeForm}
              >
                {form === AuthForm.LOGIN ? ' register now!' : ' login now!'}
              </span>
            </Form.Item>
          </Form>
        </Card>
      </section>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { loading, errors, feedback } = state;

  return {
    loading: create_loading_selector(['LOGIN', 'REGISTER'])(loading),
    error: create_error_selector(['LOGIN', 'REGISTER'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, {
  login,
  register
})(Form.create<FormComponentProps & ComponentProps>({name: 'Login'})(withRouter(Login)));
