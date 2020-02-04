import './Item.scss';

import React from 'react';

interface Props {
  color: string,
  active?: boolean,
  index?: number,
  setActive?: (index: number) => void
}

const Item: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  color, active, index, setActive,
  ...rest
}) => (
  <div
    className={active ? "colors-placeholder__item active" : "colors-placeholder__item"}
    style={{background: color}}
    onClick={() => setActive ? setActive(index as number) : ''}
    {...rest}
  />
)

export default React.memo(Item);
