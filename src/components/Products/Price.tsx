import './Price.scss';

import React from 'react';
import { Badge } from 'antd';

/* Helpers */
import { calculatePriceSale, formatToCurrencyVND } from 'helpers';

interface Props {
  show_sale?: boolean,
  sale: number,
  price: number
}

const Price: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({show_sale, sale, price}) => {
  return (
    <div className="product-price">
      {
        show_sale && sale !== 0 && <Badge count={`${sale}%`}>
          <div className="real">{formatToCurrencyVND(price)}</div>
        </Badge>
      }
      <div className="sale">{formatToCurrencyVND(calculatePriceSale(sale, price))}</div>
    </div>
  )
}

Price.defaultProps = {
  show_sale: true
}

export default Price;
