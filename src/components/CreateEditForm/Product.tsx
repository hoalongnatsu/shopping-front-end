import './Product.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Typography, Form, Input, Alert, InputNumber, Icon, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { withRouter, RouteComponentProps } from 'react-router-dom';

/* Interface */
import { RootState, ColorsState } from 'interface';

/* Components */
import ColorsPlaceholder from 'components/ColorsPlaceholder';
import FormAddProductProps from 'components/Form/AddProductProps';

/* Constant */
import { FormType } from 'constant-app';

/* Actions */
import { get_all_colors } from 'actions/colors';

/* Helpers */
import { create_loading_selector, create_error_selector } from 'helpers/selectors';

const { Title } = Typography;

interface ComponentProps {
  formType: FormType,
}

interface StateToProps {
  colors: ColorsState[],
  loading: boolean,
  error: boolean,
  message: string
}

interface DispatchProps {
  get_all_colors: () => void
}

type Props = FormComponentProps & RouteComponentProps & ComponentProps & StateToProps & DispatchProps;

interface State {
  submitted: boolean,
  productColors: ColorsState[],
  activeColor: number,
  showAddColor: boolean,
}

class Products extends Component<Props, State> {
  state = {
    submitted: false,
    productColors: [],
    showAddColor: false,
    activeColor: -1,
  }

  componentDidMount() {
    const { colors, get_all_colors } = this.props;
    
    if (colors.length === 0) {
      get_all_colors();
    }
  }

  _submit = () => {

  }

  _toggleFormAddColor = () => {
    const { showAddColor } = this.state;
    this.setState({showAddColor: !showAddColor});
  }

  _setActiveColor = (index: number) => {
    this.setState({activeColor: index});
  }

  _addColor = () => {
    const { productColors, activeColor } = this.state;
    const { colors } = this.props;
    if (activeColor === -1) { return; } // not choose color

    const index = productColors.findIndex((productColor: ColorsState) => productColor._id === colors[activeColor]._id)
    if (index === -1) { // If color not exist
      this.setState({productColors: [...productColors, colors[activeColor]]});
    }
  }

  getProductProps = () => {

  }

  render() {
    const { formType, colors, error, message } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { submitted, showAddColor, activeColor, productColors } = this.state;
    
    return (
      <>
        {
          submitted && error && <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />
        }
        <Title level={3}>{formType === FormType.CREATE ? 'Create new' : 'Edit'} product</Title>
        <Form onSubmit={this._submit}>
          <Form.Item label="Product Name">
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: 'This field is required.' }]
              })(<Input placeholder="Enter Name" />)
            }
          </Form.Item>
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item label="Price">
                {
                  getFieldDecorator('price', {
                    rules: [{ required: true, message: 'This field is required.' }]
                  })(<InputNumber min={0} placeholder="Product Price" style={{width: '100%'}} />)
                }
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Sale">
                {
                  getFieldDecorator('sale', {
                    initialValue: 0,
                    rules: [{ required: true, message: 'This field is required.' }]
                  })(<InputNumber min={0} max={100} style={{width: '100%'}} />)
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button type="dashed" onClick={this._toggleFormAddColor}>
          <Icon type="plus" /> Add color
        </Button>
        {
          showAddColor && <div className="form-add-color">
            <ColorsPlaceholder colors={colors} active={activeColor} setActive={this._setActiveColor} />
            <Button style={{marginTop: 10}} onClick={this._addColor}>Add</Button>
            <Button style={{marginLeft: 10}} onClick={this._toggleFormAddColor}>Cancel</Button>
          </div>
        }
        {
          productColors.map((color: ColorsState) => (
            <FormAddProductProps key={color._id} color={color} />
          ))
        }
      </>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { colors, loading, errors, feedback } = state;

  return {
    colors,
    loading: create_loading_selector([])(loading),
    error: create_error_selector([])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, {
  get_all_colors
})(Form.create<FormComponentProps & ComponentProps>({name: 'Create Product'})(withRouter(Products)));;
