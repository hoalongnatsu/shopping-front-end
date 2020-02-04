import './AddProductProps.scss';

import React, { Component } from 'react';
import { Button } from 'antd';
import isequal from 'lodash.isequal';

/* Interface */
import { ColorsState, ProductPropValues } from 'interface';

/* Components */
import Label from 'components/Label';
import ColorsPlaceholderItem from 'components/ColorsPlaceholder/Item';
import ImagesReview from 'components/ImagesReview';
import FormUploadProductImage from 'components/Form/UploadProductImage';

/* Constant */
import { SIZES } from 'constant-app';

interface ComponentProps {
  values: ProductPropValues,
  color: ColorsState,
  deleteColor: (id: any) => void,
  getProductProps: (color_id: string, productProps: ProductPropValues) => void
}

type Props = ComponentProps;

interface State {
  sizesActive: string[],
  images: string[]
  edit: boolean,
}

class AddProductProps extends Component<Props, State> {
  state = {
    sizesActive: [],
    images: [],
    edit: false,
  }

  componentDidMount() {
    if (this.props.values) {
      const { size, images } = this.props.values as ProductPropValues;

      this.setState({sizesActive: size, images});
    }
  }

  shouldComponentUpdate({values: nextValues}: Props, nextState: State) {
    const { values } = this.props;
    const isPropsChange = !isequal(values, nextValues);
    const isStateChange = !isequal(this.state, nextState);
    return isPropsChange || isStateChange;
  }

  allowEdit = () => {
    this.setState({edit: true});
  }

  cancelEdit = () => {
    this.setState({edit: false});
  }

  addSize = (size: string) => {
    const { sizesActive } = this.state;
    const newSizesActive = sizesActive.filter((s) => s !== size);

    if (sizesActive.length === newSizesActive.length) {
      this.setState({sizesActive: [...sizesActive, size]});
    } else {
      this.setState({sizesActive: newSizesActive});
    }
  }

  deleteImage = (image: string) => {
    const { images } = this.state;
    const newImages = images.filter((img) => img !== image);
    this.setState({images: newImages});
  }

  uploadChange = (info: any) => {
    if (info.file.response) { // success upload
      const { filename } = info.file.response;
      const { images } = this.state;
      this.setState({images: [...images, filename]});
    }
  }

  _submit = () => {
    const { color } = this.props;
    const { sizesActive, images } = this.state;

    if (sizesActive.length && images.length) {
      const productProps: ProductPropValues = {
        size: sizesActive,
        images
      }

      this.setState({edit: false});
      this.props.getProductProps(color._id as string, productProps);
    }
  }

  render() {
    const { color, deleteColor } = this.props;
    const { sizesActive, edit, images } = this.state;

    return (
      <div className="form-add-props">
        {
          edit === false && <div className="disable" />
        }
        <ColorsPlaceholderItem color={color.code} />
        <Label name="Pick size" required={true} />
        <div className="size">
          {
            SIZES.map((s) => (
              <div
                key={s}
                className={sizesActive.includes(s as never) ? "size__item active" : "size__item"}
                onClick={() => this.addSize(s)}
              >
                {s}
              </div>
            ))
          }
        </div>
        <Label name="Images" />
        <ImagesReview images={images} onDelete={this.deleteImage} />
        <FormUploadProductImage code={color.code} uploadChange={this.uploadChange} />
        {
          edit ? (
            <>
              <Button type="primary" htmlType="submit" style={{marginRight: 12}} onClick={this._submit}>
                Save
              </Button>
              <Button type="primary" style={{marginRight: 12}} onClick={this.cancelEdit}>
                Canel
              </Button>
            </>
          ) : (
            <>
              <Button type="primary" style={{marginRight: 12}} onClick={this.allowEdit}>
                Edit
              </Button>
              <Button type="primary" onClick={() => deleteColor(color._id)}>Delete</Button>
            </>
          )
        }
      </div>
    )
  }
}

export default AddProductProps;
