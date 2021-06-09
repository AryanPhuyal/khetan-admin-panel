import React from "react";
import {Container, Row, Col} from "react-bootstrap";

import AdsAddCard from "./components/AdsAddCard";

const AdsAdd = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h3 className="page-title">Advertisment Add</h3>
        </Col>
      </Row>
      <Row>
        <AdsAddCard />
      </Row>
    </Container>
  );
};
export default AdsAdd;
