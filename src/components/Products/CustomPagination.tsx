import './CustomPagination.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination, Icon } from 'antd';

/* Interface */
import { RootState, ProductState, ProductFiltersState, ProductPagination } from 'interface';

/* Actions */
import { get_products_by_filter } from 'actions/products';
import { change_product_filters } from 'actions/filters';

interface ComponentProps {
  simple?: boolean
}

interface StateToProps {
  products: ProductState[],
  filters: ProductFiltersState,
  product_pagination: ProductPagination
}

interface DispatchProps {
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

}

class CustomPagination extends Component<Props, State> {
  static defaultProps = {
    simple: false
  }

  state = {}

  _onChange = (next: number) => {
    const { get_products_by_filter, change_product_filters, filters } = this.props;
    const { color_id, size, price_range, category_id, brand_id } = filters;

    get_products_by_filter(
      color_id as string,
      size as string,
      price_range as number[],
      category_id as string,
      brand_id as string,
      next
    );
    change_product_filters(
      color_id as string,
      size as string,
      price_range as number[],
      category_id as string,
      brand_id as string,
      next
    );
    window.scrollTo(0, 0);
  }

  _itemRender = (page: number, type: any, origin: any) => {
    switch (type) {
      case "prev":
        return (
          <div className="direction direction--left">
            <div className="icon"><Icon type="left" /></div>
            <div className="text">Prev</div>
          </div>
        )
      case "next":
        return (
          <div className="direction direction--right">
            <div className="text">Next</div>
            <div className="icon"><Icon type="right" /></div>
          </div>
        )
      case "page":
        return (
          <div className="item">{page}</div>
        )
      default:
        return origin;
    }
  }

  render() {
    const { filters, product_pagination, simple } = this.props;

    return (
      simple ? (
        <Pagination
          className="custom-pagination custom-pagination--simple"
          pageSize={product_pagination.per_page}
          total={product_pagination.total}
          current={filters.page}
          onChange={this._onChange}
          simple={simple}
        />
      ) : (
        <Pagination
          className="custom-pagination"
          pageSize={product_pagination.per_page}
          total={product_pagination.total}
          current={filters.page}
          itemRender={this._itemRender}
          onChange={this._onChange}
          simple={simple}
        />
      )
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { products, filters, product_pagination } = state;

  return {
    products,
    filters,
    product_pagination
  }
}

export default connect(mapStateToProps, {
  get_products_by_filter,
  change_product_filters
})(CustomPagination);
