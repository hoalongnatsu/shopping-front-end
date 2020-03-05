import './ImageShow.scss';

import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import ReactImageMagnify from 'react-image-magnify';

const { REACT_APP_IMAGE_URL, REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER } = process.env;
const IMAGE_URL = `${REACT_APP_IMAGE_URL}/${REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER}`;

interface Props {
  images: string[]
}

interface State {
  image_gallery: string[]
}

class ImageShow extends Component<Props, State> {
  state = {
    image_gallery: []
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { images } = props;

    if (images.length !== 0) {
      const image_gallery = images.map((image) => {
        const url = `${IMAGE_URL}/${image}`;
        return {
          original: url,
          thumbnail: url,
          renderItem: () => (
            <ReactImageMagnify
              smallImage={{
                isFluidWidth: true,
                src: `${IMAGE_URL}/${image}`
              }}
              largeImage={{
                width: 1200,
                height: 1200,
                src: `${IMAGE_URL}/${image}`
              }}
              enlargedImagePortalId="myPortal"
            />
          )
        }
      })

      return { image_gallery }
    }

    return null;
  }

  render() {
    const { image_gallery } = this.state;

    return (
      <div className="image-show">
        <ImageGallery
          items={image_gallery}
          showPlayButton={false}
          showNav={false}
          showFullscreenButton={false}
          thumbnailPosition={window.screen.width < 480 ? "bottom" : "left"}
        />
        <div id="myPortal" />
      </div>
    )
  }
}

export default ImageShow;
