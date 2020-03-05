import './index.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Typography } from 'antd';

/* Components */
import ProductsPlaceholder from 'components/Products/Placeholder';
import ProductsCustomPagination from 'components/Products/CustomPagination';
import FilterProducts from 'components/Filter/Products';
import ProductsShow from 'components/Products/Show';

/* Interface */
import { RootState, CategoryState } from 'interface';

/* Actions */
import { reset_product_filters } from 'actions/filters';

const { Title } = Typography;

interface ComponentProps {
  
}

interface StateToProps {
  categories: CategoryState[],
}

interface DispatchProps {
  reset_product_filters: (category_id: string) => void,
}

type Props = RouteComponentProps<{slug: string}> & ComponentProps & StateToProps & DispatchProps;

interface State {
  category: CategoryState,
  fetching: boolean
}

class Products extends Component<Props, State> {
  state = {
    category: {} as CategoryState,
    fetching: true
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { categories, match, reset_product_filters } = props;
    const category_slug = match.params.slug;

    if (categories.length === 0) { return null; }
    if (category_slug === 'all') {
      reset_product_filters('');
      return { category: {} as CategoryState, fetching: false };
    }

    const category = categories.find((category) => category.slug === category_slug);
    if (category) {
      reset_product_filters(category._id as string);
      return { category, fetching: false };
    }

    reset_product_filters('');
    return { category: {} as CategoryState, fetching: false };
  }

  render() {
    const { categories } = this.props;
    const { category, fetching } = this.state;

    return (
      <section className="products-section container">
        {
          fetching ? (
            <ProductsPlaceholder />
          ) : (
            <>
              <Title level={3}>{category.name ? category.name : 'Tất cả sản phẩm'}</Title>
              <ProductsCustomPagination />
              <Row gutter={[16, 16]}>
                <Col md={6}>
                  <FilterProducts category_default={category._id} categories={categories} />
                </Col>
                <Col md={18}>
                  <ProductsShow category_id={category._id ? category._id : ''} />
                </Col>
              </Row>
              <ProductsCustomPagination />
              <ProductsCustomPagination simple={true} />
            </>
          )
        }
      </section>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { categories } = state;

  return {
    categories,
  }
}

export default connect(mapStateToProps, { reset_product_filters })(withRouter(Products));
