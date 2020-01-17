import './index.scss';

import React, { PureComponent } from 'react';

import { ColorsState } from 'interface';

import Item from './Item';

interface Props {
  colors: ColorsState[],
  active?: number,
  setActive: (index: number) => void
}

interface State {

}

class ColorsPlaceholder extends PureComponent<Props, State> {
  state = {}

  render() {
    const { colors, active, setActive } = this.props;

    return (
      <div className="colors-placeholder">
        {
          colors.map((color, index) => (
            <Item
              key={color._id}
              active={active === index}
              style={{background: color.code}}
              onClick={() => setActive(index)}
            />
          ))
        }
      </div>
    )
  }
}

export default ColorsPlaceholder;
