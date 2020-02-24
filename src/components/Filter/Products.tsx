import './Products.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Slider, Radio, Button, Spin, Alert } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

/* Components */
import ColorsPlaceholder from 'components/ColorsPlaceholder';
import Size from 'components/Size';

/* Interface */
import { RootState, CategoryState, ColorsState, BrandsState } from 'interface';

/* Actions */
import { get_all_colors } from 'actions/colors';
import { get_all_brands } from 'actions/brands';
import { get_products_by_filter } from 'actions/products';
import { change_product_filters } from 'actions/filters';

/* Helpers */
import { create_error_selector } from 'helpers/selectors';
import { formatToCurrencyVND } from 'helpers/format';

/* Constant */
import { SIZE } from 'constant-app';

const { Title } = Typography;

interface ComponentProps {
  categories: CategoryState[],
  category_default?: string
}

interface StateToProps {
  colors: ColorsState[],
  brands: BrandsState[],
  loading: any,
  error: boolean,
  message: string
}

interface DispatchProps {
  get_all_colors: () => void,
  get_all_brands: () => void,
  get_products_by_filter: (
    color_id: string,
    size: string,
    price_range: number[],
    category_id: string,
    brand_id: string,
    page: number
  ) => void,
  change_product_filters: (
    color_id: string,
    size: string,
    price_range: number[],
    category_id: string,
    brand_id: string,
    page: number
  ) => void,
}

type Props = ComponentProps & StateToProps & DispatchProps;

interface State {
  [key: string]: any,
  index_active_color: number,
  index_active_size: number,
  category_id: string,
  brand_id: string,
  price_range: number[],
  filter_change: boolean,
  call_filter_api: boolean
}

class Products extends Component<Props, State> {

  static defaultProps = {
    category_default: ''
  }

  state = {
    index_active_color: -1,
    index_active_size: -1,
    category_id: '',
    brand_id: '',
    price_range: [],
    filter_change: false,
    call_filter_api: false
  }

  componentDidMount() {
    const { colors, get_all_colors, brands, get_all_brands } = this.props;

    if (colors.length === 0) {
      get_all_colors();
    }

    if (brands.length === 0) {
      get_all_brands();
    }
  }

  setIndexActive = (type: string, index: number) => {
    const { filter_change } = this.state;

    if (!filter_change) {
      this.setState({filter_change: true})
    }

    if (type === 'color') {
      this.setState({index_active_color: index});
    } else if (type === 'size') {
      this.setState({index_active_size: index});
    }
  }

  _onChange = (e: RadioChangeEvent) => {
    const { filter_change } = this.state;

    if (!filter_change) {
      this.setState({filter_change: true})
    }

    const property = `${e.target.name}_id`;
    this.setState({[property]: e.target.value});
  }

  _onSliderChange = (value: any) => {
    const { filter_change } = this.state;

    if (!filter_change) {
      this.setState({filter_change: true})
    }

    this.setState({price_range: value})
  }

  filter = () => {
    const { get_products_by_filter, change_product_filters, colors } = this.props;
    const { index_active_color, category_id, brand_id, price_range, filter_change, call_filter_api } = this.state;

    if (filter_change) {
      get_products_by_filter(
        colors[index_active_color] ? colors[index_active_color]._id as string : '',
        '',
        price_range,
        category_id,
        brand_id,
        1
      );
      change_product_filters(
        colors[index_active_color] ? colors[index_active_color]._id as string : '',
        '',
        price_range,
        category_id,
        brand_id,
        1
      );
      this.setState({filter_change: false});

      if (!call_filter_api) {
        this.setState({call_filter_api: true});
      }
    }
  }

  removeFilter = () => {
    const { call_filter_api } = this.state;
    const { get_products_by_filter, change_product_filters, category_default } = this.props;

    if (call_filter_api) {
      this.setState({
        index_active_color: -1,
        index_active_size: -1,
        category_id: '',
        brand_id: '',
        price_range: [],
        filter_change: false,
        call_filter_api: false
      })
      get_products_by_filter('', '', [], category_default as string, '', 1);
      change_product_filters('', '', [], category_default as string, '', 1);

      return;
    }

    this.setState({
      index_active_color: -1,
      index_active_size: -1,
      category_id: '',
      brand_id: '',
      price_range: [],
      filter_change: false
    })
  }

  render() {
    const { categories, colors, brands, loading, error, message } = this.props;
    const { index_active_color, index_active_size, category_id, brand_id, price_range, filter_change } = this.state;

    return (
      <div className="filter-product box-shadow">
        {
          error ? (
            <Alert message={message} type="error" closable={true} style={{marginBottom: 12}} />
          ) : (
            <>
              <div className="colors">
                <Title level={4}>Màu</Title>
                <Spin spinning={loading["GET_COLORS"]} tip="Fetching categories...">
                  <ColorsPlaceholder
                    colors={colors}
                    active={index_active_color}
                    setActive={(index) => this.setIndexActive('color', index)}
                  />
                </Spin>
              </div>
              <div className="size">
                <Title level={4}>Kích cỡ</Title>
                <Size
                  size={SIZE}
                  active={index_active_size}
                  setActive={(index) => this.setIndexActive('size', index)}
                />
              </div>
              <div className="price">
                <Title level={4}>Giá trong khoảng</Title>
                <Slider
                  range={true}
                  min={50000}
                  max={1000000}
                  value={price_range[0] ? [price_range[0], price_range[1]] : [50000, 500000]}
                  tooltipVisible={true}
                  tipFormatter={formatToCurrencyVND}
                  tooltipPlacement="bottomLeft"
                  step={10000}
                  onChange={this._onSliderChange}
                />
              </div>
              <div className="category">
                <Title level={4}>Loại</Title>
                <Radio.Group name="category" value={category_id} onChange={this._onChange}>
                  {categories.map((category) => <Radio key={category._id} value={category._id}>{category.name}</Radio>)}
                </Radio.Group>
              </div>
              <div className="brand">
                <Title level={4}>Thương hiệu</Title>
                <Spin spinning={loading["GET_BRANDS"]} tip="Fetching brands...">
                  <Radio.Group name="brand" value={brand_id} onChange={this._onChange}>
                    {brands.map((brand) => <Radio key={brand._id} value={brand._id}>{brand.name}</Radio>)}
                  </Radio.Group>
                </Spin>
              </div>
              <hr />
              <div className="button">
                <Button type="primary" shape="round" onClick={this.filter} disabled={!filter_change}>Lọc sản phẩm</Button>
                <Button type="danger" ghost={true} shape="round" onClick={this.removeFilter}>Xóa</Button>
              </div>
            </>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { colors, brands, loading, errors, feedback } = state;

  return {
    colors,
    brands,
    loading,
    error: create_error_selector(['GET_COLORS', 'GET_BRANDS'])(errors),
    message: feedback.error
  }
}

export default connect(mapStateToProps, {
  get_all_colors,
  get_all_brands,
  get_products_by_filter,
  change_product_filters
})(Products);