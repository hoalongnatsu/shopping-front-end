import './UploadProductImage.scss';

import React, { Component } from 'react';
import { Form, Button, Upload, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';

const API = process.env.REACT_APP_API_URL;

interface ComponentProps {
  code: string,
  uploadChange: (info: any) => void
}

type Props = FormComponentProps & ComponentProps;

interface State {
  
}

class UploadProductImage extends Component<Props, State> {
  state = {}

  _getFilePreview = (e: any) => {
    return e && e.fileList;
  }

  render() {
    const { code, uploadChange } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <Form.Item label="Upload Images">
          {
            getFieldDecorator(`images_${code}`, {
              valuePropName: 'fileList',
              rules: [{ required: true, message: 'This field is required.' }],
              getValueFromEvent: this._getFilePreview,
            })(
              <Upload
                name="logo"
                action={`${API}/photos/upload`}
                multiple={true}
                onChange={uploadChange}
                showUploadList={false}
              >
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create<Props>()(UploadProductImage);
