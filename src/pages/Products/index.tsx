import './index.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Breadcrumb, Row, Col } from 'antd';

/* Components */
import ProductsPlaceholder from 'components/Products/Placeholder';
import FilterProducts from 'components/Filter/Products';
import ProductsShow from 'components/Products/Show';

/* Interface */
import { RootState, CategoryState } from 'interface';

interface ComponentProps {
  
}

interface StateToProps {
  categories: CategoryState[],
}

type Props = RouteComponentProps<{name: string}> & ComponentProps & StateToProps;

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
    const { categories, match } = props;
    const category_name = match.params.name;

    if (categories.length === 0) { return null; }
    if (category_name === 'all') {
      return { category: {} as CategoryState, fetching: false };
    }

    const category = categories.find((category) => category.name === category_name);
    if (category) {
      return { category, fetching: false };
    }

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
              <Breadcrumb separator=">">
                <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
                <Breadcrumb.Item>{category.name ? category.name : 'Tất cả sản phẩm'}</Breadcrumb.Item>
              </Breadcrumb>
              <Row gutter={[16, 16]}>
                <Col md={6}>
                  <FilterProducts categories={categories} />
                </Col>
                <Col md={18}>
                  <ProductsShow category_id={category._id ? category._id : ''} />
                </Col>
              </Row>
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

export default connect(mapStateToProps, null)(withRouter(Products));
