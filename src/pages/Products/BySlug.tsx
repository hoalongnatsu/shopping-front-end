import './BySlug.scss';

import React, { Component } from 'react';
import { Row, Col, Breadcrumb, Alert, Skeleton, Rate, Typography, Input, Button, Collapse } from 'antd';
import { RouteComponentProps, Link } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';

/* Components */
import ProductsPrice from 'components/Products/Price';
import ProductsImageShow from 'components/Products/ImageShow';
import ColorsPlaceholder from 'components/ColorsPlaceholder';
import Size from 'components/Size';

/* Interface */
import { ProductState } from 'interface';

/* Services */
import { get_product_by_slug } from 'services/products';

const { Title } = Typography;
const { Panel } = Collapse;

interface ComponentProps {
  
}

type Props = RouteComponentProps<{slug: string}> & ComponentProps;

interface State {
  product: ProductState | null,
  loading: boolean,
  error: boolean,
  message: string,
  category_id: string,
  index_active_color: number,
  index_active_size: number
}

class BySlug extends Component<Props, State> {
  state = {
    product: {} as ProductState,
    loading: true,
    error: false,
    message: '',
    category_id: '',
    index_active_color: 0,
    index_active_size: 0,
  }

  componentDidMount() {
    const { match } = this.props;
    const { slug } = match.params;
    const { index_active_color } = this.state;

    get_product_by_slug(slug).then((product) => {
      product.descripsion = product.descripsion.replace(/"alignment":"none"/g, '"alignment":"center"');
      this.setState({
        product,
        category_id: product.colors[index_active_color]._id as string,
        loading: false
      });
    }).catch((e) => {
      this.setState({
        error: true,
        message: 'Something went wrong please try again later!'
      })
    })
  }

  setIndexActive = (type: string, index: number) => {
    const { product } = this.state;

    if (type === 'color') {
      this.setState({
        index_active_color: index,
        category_id: product.colors[index]._id as string,
      });
    } else if (type === 'size') {
      this.setState({index_active_size: index});
    }
  }

  render() {
    const { product, loading, error, message, category_id, index_active_color } = this.state;

    return error ? (
      <Alert message={message} type="error" closable={true} />
    ) : (
      <section className="product-by-slug box-shadow">
        <div className="content">
          <Row gutter={[16, 16]}>
            <Col md={10}>
              <Skeleton loading={loading} active={true} paragraph={{rows: 13}}>
                <ProductsImageShow images={product?.props?.[category_id]?.images} />
              </Skeleton>
            </Col>
            <Col md={14}>
              <Skeleton loading={loading} active={true} paragraph={{rows: 13}}>
                <div className="info">
                  <Breadcrumb separator=">">
                    <Breadcrumb.Item><Link to="/">Trang chủ</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/products/category/all">Sản phẩm</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <Link to={`/products/category/${product?.category?.slug}`}>{product?.category?.slug}</Link>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  <Rate disabled={true} defaultValue={4} />
                  <Title level={3}>{product.name}</Title>
                  <ProductsPrice sale={product.sale} price={product.price} />
                  <div className="color">
                    <div className="title">Màu</div>
                    <ColorsPlaceholder
                      colors={product.colors}
                      setActive={(index) => this.setIndexActive('color', index)}
                      active={index_active_color}
                    />
                  </div>
                  <div className="size">
                    <div className="title">Kích cỡ</div>
                    <Size size={product?.props?.[category_id]?.size} setActive={(item) => console.log(item)} />
                  </div>
                  <div className="quantity">
                    <div className="title">Số lượng</div>
                    <div className="quantity-form">
                      <Button type="primary" shape="circle" icon="minus" />
                      <Input name="quantity" value={0} />
                      <Button type="primary" shape="circle" icon="plus" />
                    </div>
                  </div>
                  <div className="button-group">
                    <Button type="danger" shape="round" size="large">
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                </div>
              </Skeleton>
            </Col>
          </Row>
        </div>
        <div className="description">
          <Collapse bordered={false}>
            <Panel header="Mô tả sản phảm" key="description">
              {product.descripsion && <div dangerouslySetInnerHTML={{__html: draftToHtml(JSON.parse(product.descripsion))}} />}
            </Panel>
          </Collapse>
        </div>
      </section>
    )
  }
}

export default BySlug;
