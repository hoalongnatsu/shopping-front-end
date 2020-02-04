import './index.scss';

import React from 'react';

interface Props {
  name: string,
  required?: boolean
}

const Label: React.FC<Props> = ({name, required}) => (
  <div className="label">
    {required && <span>* </span>}
    <label>{name}:</label>
  </div>
)

export default Label
