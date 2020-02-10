import './index.scss';

import React from 'react';

interface Props {
  
}

const Logo: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({...rest}) => (
  <div className="logo" {...rest}>LHTV</div>
)

export default Logo;
