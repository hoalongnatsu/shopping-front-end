/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string,
    REACT_APP_IMAGE_URL: string,
    REACT_APP_SERVER_BRAND_IMAGE_FOLDER: string,
    REACT_APP_SERVER_PRODUCT_IMAGE_FOLDER: string,
  }
}