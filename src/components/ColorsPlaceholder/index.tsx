import './index.scss';

import React from 'react';

import { ColorsState } from 'interface';

import Item from './Item';

interface Props {
  colors: ColorsState[],
  active?: number,
  setActive: (index: number) => void
}

const ColorsPlaceholder: React.FC<Props> = ({colors, active, setActive}) => (
  <div className="colors-placeholder">
    {
      colors.map((color, index) => (
        <Item
          key={color._id}
          color={color.code}
          active={active === index}
          index={index}
          setActive={setActive}
        />
      ))
    }
  </div>
)

export default React.memo(ColorsPlaceholder);
