import './AddProductProps.scss';

import React, { Component } from 'react';
import { Form, Button, Upload, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';

/* Interface */
import { ColorsState } from 'interface';

/* Components */
import Label from 'components/Label';
import ColorsPlaceholderItem from 'components/ColorsPlaceholder/Item';

/* Constant */
import { SIZES } from 'constant-app';

const API = process.env.REACT_APP_API_URL;

interface ComponentProps {
  color: ColorsState,
  getProductProps?: () => void
}

type Props = FormComponentProps & ComponentProps;

interface State {
  sizesActive: string[],
  updated: boolean
}

class AddProductProps extends Component<Props, State> {
  state = {
    sizesActive: [],
    updated: false
  }

  addSize = (size: string) => {
    const { sizesActive, updated } = this.state;
    const newSizesActive = sizesActive.filter((s) => s !== size);

    if (sizesActive.length === newSizesActive.length) {
      this.setState({sizesActive: [...sizesActive, size]});
    } else {
      this.setState({sizesActive: newSizesActive});
    }

    // Enable save button
    if (!updated) { this.setState({updated: true}); }
  }

  _getFilePreview = (e: any) => {
    const { updated } = this.state;
    if (!updated) { this.setState({updated: true}); }

    return e && e.fileList;
  }

  _submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { form, color } = this.props;
    const { sizesActive } = this.state;
    const { images } = form.getFieldsValue();

    if (images) {
      const productProps = {
        color_id: color._id,
        size: sizesActive,
        images: images.map((image: any) => image.response.filename)
      }
      console.log(productProps);
      this.setState({updated: false});
    }
  }

  render() {
    const { color } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { sizesActive, updated } = this.state;

    return (
      <>
        <div className="form-add-props">
          <ColorsPlaceholderItem style={{background: color.code}} />
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
          <Form onSubmit={this._submit}>
            <Form.Item label={'Upload Images'}>
              {
                getFieldDecorator('images', {
                  valuePropName: 'fileList',
                  rules: [{ required: true, message: 'This field is required.' }],
                  getValueFromEvent: this._getFilePreview,
                })(
                  <Upload
                    name="logo"
                    action={`${API}/photos/upload`}
                    listType="picture"
                    multiple={true}
                  >
                    <Button>
                      <Icon type="upload" /> Click to upload
                    </Button>
                  </Upload>
                )
              }
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!updated}
            >
              Save
            </Button>
          </Form>
        </div>
      </>
    )
  }
}

export default Form.create<Props>({name: 'Add Product Props'})(AddProductProps);
