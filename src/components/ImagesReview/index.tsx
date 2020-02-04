import './index.scss';

import React from 'react';
import { Icon } from 'antd';

const { REACT_APP_IMAGE_URL, REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER } = process.env;
const IMAGE_URL = `${REACT_APP_IMAGE_URL}/${REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER}`;

interface Props {
  images: string[],
  width?: number,
  height?: number,
  cover?: boolean,
  showDelete?: boolean,
  onDelete?: (image: string) => void,
}

const ImagesReview: React.FC<Props> = ({images, width, height, cover, showDelete, onDelete}) => (
  <div className="images-review">
    {
      images.map((image) => (
        <div key={image} className="item" style={{width, height}}>
          {
            showDelete && <Icon type="close-circle" onClick={() => onDelete ? onDelete(image) : ''} />
          }
          <img
            src={`${IMAGE_URL}/${image}`}
            alt="item"
            style={{objectFit: cover ? 'cover' : 'initial'}}
          />
        </div>
      ))
    }
  </div>
)

ImagesReview.defaultProps = {
  width: 75,
  height: 75,
  cover: true,
  showDelete: true
}

export default ImagesReview;
