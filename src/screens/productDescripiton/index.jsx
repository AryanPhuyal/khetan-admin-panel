import React from "react";
import {Col, Container, Row} from "reactstrap";
import ProductCard from "./components/ProductCard";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

export default function ProductPage({history}) {
  const id = history.location.search.split("=")[1];
  const {done, products, loading} = useSelector((state) => state.product);

  const product = products.filter((item) => item._id === id)[0];
  return (
    <Container>
      <Row>
        <Col md={12}>
          {products
            .filter((item) => item._id === id)
            .map((fitem) => (
              <h3 className="page-title">{fitem.name}</h3>
            ))}
          {products
            .filter((item) => item._id === id)
            .map((fitem) => (
              <h3 className="page-subhead subhead">
                Get to know detailed information about {fitem.name}
              </h3>
            ))}
        </Col>
      </Row>
      <Row>
        {products
          .filter((item) => item._id === id)
          .map((fitem) => (
            <ProductCard items={fitem} />
          ))}
      </Row>
    </Container>
  );
}
