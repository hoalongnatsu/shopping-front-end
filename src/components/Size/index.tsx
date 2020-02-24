import './index.scss';

import React from 'react';

interface Props {
  size: string[],
  active?: number,
  setActive: (index: number) => void
}

interface State {
  
}

const Size: React.FC<Props> = ({size, active, setActive}) => (
  <div className="size-group">
    {
      size.map((s, index) => (
        <div
          key={s}
          className={active === index ? "size-group__item active" : "size-group__item"}
          onClick={() => setActive(index)}
        >
          {s}
        </div>
      ))
    }
  </div>
)

export default Size;
