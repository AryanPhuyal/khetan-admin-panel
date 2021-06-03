import React from "react";
import { Col, Container, Row } from "reactstrap";
import ProductCard from "./components/ProductCard";
import qs from "qs";

const ProductPage = ({ location }) => {
  const id = qs.parse(location.search.substring(1));
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Product Details</h3>
          <h3 className="page-subhead subhead"></h3>
        </Col>
      </Row>
      <Row>
        <ProductCard />
      </Row>
    </Container>
  );
};

export default ProductPage;
