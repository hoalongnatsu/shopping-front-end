import React from 'react';

interface Props {
  active?: boolean
}

const Item: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({active, ...rest}) => (
  <div
    className={active ? "colors-placeholder__item active": "colors-placeholder__item"}
    {...rest}
  />
)

export default Item;
