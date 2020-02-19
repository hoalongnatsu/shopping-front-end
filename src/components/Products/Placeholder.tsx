import './Placeholder.scss';

import React, { Component } from 'react';
import { Row, Col, Skeleton } from 'antd';

interface Props {
  
}
interface State {
  
}

class Placeholder extends Component<Props, State> {
  state = {}

  render() {
    return (
      <Row gutter={[16, 16]}>
        <Col><div className="box-shadow" style={{padding: 10}}><Skeleton active={true} paragraph={false} /></div></Col>
        <Col md={6}>
          <div className="box-shadow" style={{padding: 10}}><Skeleton active={true} paragraph={{rows: 16}} /></div>
        </Col>
        <Col md={18}>
          <Row gutter={[16, 16]} style={{marginBottom: 20}}>
            {
              (new Array(9).fill(1)).map((_, index) => (
                <Col key={index} sm={8}>
                  <div className="box-shadow" style={{padding: 10}}><Skeleton active={true} paragraph={{rows: 4}} /></div>
                </Col>
              ))
            }
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Placeholder;
