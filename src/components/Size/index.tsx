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
      size.map((s) => (
        <div
          key={s}
          className={"size-group__item"}
        >
          {s}
        </div>
      ))
    }
  </div>
)

export default Size;
