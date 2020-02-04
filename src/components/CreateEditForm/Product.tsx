import './Product.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Button,
  Typography,
  Form,
  Input,
  Alert,
  InputNumber,
  Icon,
  Row,
  Col,
  Tooltip,
  Select, 
  Spin
} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { EditorState, convertToRaw, convertFromRaw, RawDraftContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

/* Interface */
import { RootState, ColorsState, ProductProps, ProductPropValues, BrandsState, ProductState } from 'interface';

/* Components */
import ColorsPlaceholder from 'components/ColorsPlaceholder';
import FormAddProductProps from 'components/Form/AddProductProps';

/* Constant */
import { FormType } from 'constant-app';

/* Actions */
import { get_all_colors } from 'actions/colors';
import { get_all_brands } from 'actions/brands';
import { create_product, update_product } from 'actions/products';

/* Helpers */
import { create_error_selector } from 'helpers/selectors';
import { formatToCurrencyVND } from 'helpers/format';

const { Title } = Typography;
const { Option } = Select;

interface ComponentProps {
  formType: FormType,
  product?: ProductState | null
}

interface StateToProps {
  colors: ColorsState[],
  brands: BrandsState[],
  loading: boolean,
  error: boolean,
  message: string
}

interface DispatchProps {
  get_all_colors: () => void,
  get_all_brands: () => void,
  create_product: (product: ProductState, history: any) => void,
  update_product: (id: any, product: ProductState, history: any) => void,
}

type Props = FormComponentProps & RouteComponentProps & ComponentProps & StateToProps & DispatchProps;

interface State {
  submitted: boolean,
  productsColors: ColorsState[],
  activeColor: number,
  showAddColor: boolean,
  productProps: ProductProps,
  editorState: EditorState
}

class Products extends Component<Props, State> {
  state = {
    submitted: false,
    productsColors: [],
    showAddColor: false,
    activeColor: -1,
    productProps: {},
    editorState: EditorState.createEmpty()
  }

  componentDidMount() {
    const { colors, get_all_colors, brands, get_all_brands, form, formType } = this.props;

    if (formType === FormType.EDIT) {
      const { name, price, sale, descripsion, colors, props } = this.props.product as ProductState;
      const editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(descripsion) as RawDraftContentState));

      form.setFieldsValue({name, price, sale});
      this.setState({
        productsColors: colors,
        productProps: props,
        editorState
      });
    }
    
    if (colors.length === 0) {
      get_all_colors();
    }

    if (brands.length === 0) {
      get_all_brands();
    }
  }

  _submit = () => {
    const { form, formType, create_product, update_product, history, product } = this.props;
    const { productsColors, productProps, editorState } = this.state;

    form.validateFields((err, products) => {
      if (!err) {
        products.descripsion = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        products.colors = productsColors.map((color: ColorsState) => color._id);
        products.props = productProps;

        if (formType === FormType.CREATE) {
          create_product(products, history);
        } else {
          const id = product && product._id;
          update_product(id, products, history);
        }

        this.setState({submitted: true})
      }
    })
  }

  cancel = () => {
    this.props.history.push('/admin/products');
  }

  onEditorStateChange = (editorState: EditorState) => {
    this.setState({editorState});
  }

  toggleFormAddColor = () => {
    const { showAddColor } = this.state;
    this.setState({showAddColor: !showAddColor});
  }

  setActiveColor = (index: number) => {
    this.setState({activeColor: index});
  }

  // Add product color to products color state
  addColor = () => {
    const { productsColors, activeColor } = this.state;
    const { colors } = this.props;
    if (activeColor === -1) { return; } // not choose color

    const index = productsColors.findIndex((productColor: ColorsState) => productColor._id === colors[activeColor]._id)
    if (index === -1) { // If color not exist
      this.setState({productsColors: [...productsColors, colors[activeColor]]});
    }
  }

  deleteColor = (id: string) => {
    const { productsColors, productProps } = this.state;
    const newProductsColors = productsColors.filter((color: ColorsState) => color._id !== id);
    const newProductProps = {...productProps};
    delete newProductProps[id];
    this.setState({productsColors: newProductsColors, productProps: newProductProps});
  }

  // Add product props to products props state
  getProductProps = (color_id: string, productPropsValues: ProductPropValues) => {
    const { productProps } = this.state;
    let newProductProps = {...productProps};
    newProductProps[color_id] = productPropsValues;

    this.setState({productProps: newProductProps})
  }

  render() {
    const { formType, colors, brands, error, message, form, loading, product } = this.props;
    const { getFieldDecorator } = form;
    const { submitted, showAddColor, activeColor, productsColors, editorState, productProps } = this.state;

    return (
      <>
        {
          submitted && error && <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />
        }
        <Title level={3}>{formType === FormType.CREATE ? 'Create new' : 'Edit'} product</Title>
        <Form>
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
                <Tooltip
                  trigger={'focus'}
                  placement="topLeft"
                  title={formatToCurrencyVND(form.getFieldValue('price'))}
                >
                  {
                    getFieldDecorator('price', {
                      rules: [{ required: true, message: 'This field is required.' }]
                    })(
                      <InputNumber
                        min={0}
                        style={{width: '100%'}}
                      />
                    )
                  }
                </Tooltip>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Sale">
                {
                  getFieldDecorator('sale', {
                    initialValue: 0,
                    rules: [{ required: true, message: 'This field is required.' }]
                  })(
                    <InputNumber
                      formatter={(value: any) => `${value}%`}
                      parser={(value: any) => value.replace('%', '')}
                      min={0}
                      max={100}
                      style={{width: '100%'}}
                    />
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <Spin spinning={loading["GET_BRANDS"]} tip="Fetching brand...">
            <Form.Item label="Brand">
              {
                getFieldDecorator('brand', {
                  initialValue: product && product.brand && product.brand._id,
                  rules: [{ required: true, message: 'This field is required.' }]
                })(
                  <Select
                    style={{ width: 200 }}
                    placeholder="Select a brand"
                  >
                    {
                      brands.map((brand: BrandsState) => (
                        <Option key={brand._id} value={brand._id}>{brand.name}</Option>
                      ))
                    }
                  </Select>
                )
              }
            </Form.Item>
          </Spin>
        </Form>
        <Editor
          wrapperClassName="wrapper-editor"
          editorClassName="home-editor"
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />
        <Spin spinning={loading["GET_COLORS"]} tip="Fetching color...">
          <Button type="dashed" onClick={this.toggleFormAddColor}>
            <Icon type="plus" /> Add color
          </Button>
        </Spin>
        {
          showAddColor && <div className="form-add-color">
            <ColorsPlaceholder colors={colors} active={activeColor} setActive={this.setActiveColor} />
            <Button style={{marginTop: 10}} onClick={this.addColor}>Add</Button>
            <Button style={{marginLeft: 10}} onClick={this.toggleFormAddColor}>Cancel</Button>
          </div>
        }
        {
          productsColors.map((color: ColorsState) => (
            <FormAddProductProps
              key={color._id}
              color={color}
              getProductProps={this.getProductProps}
              deleteColor={this.deleteColor}
              values={productProps[color._id as string]}
            />
          ))
        }
        <Row style={{marginTop: 20}}>
          <Button type="primary" onClick={this._submit} loading={loading["CREATE_PRODUCT"] || loading["UPDATE_PRODUCT"]}>
            {formType === FormType.CREATE ? 'Create' : 'Save'}
          </Button>
          {
            formType === FormType.EDIT &&
            <Button type="primary" htmlType="button" style={{marginLeft: 12}} onClick={this.cancel}>
              Cancel
            </Button>
          }
        </Row>
      </>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { colors, brands, loading, errors, feedback } = state;

  return {
    colors,
    brands,
    loading,
    error: create_error_selector(["CREATE_PRODUCT", "UPDATE_PRODUCT"])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, {
  get_all_colors,
  get_all_brands,
  create_product,
  update_product
})(Form.create<FormComponentProps & ComponentProps>({name: 'Create Product'})(withRouter(Products)));;