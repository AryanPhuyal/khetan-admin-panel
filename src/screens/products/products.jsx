import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import DataReactTable from "../../component/table/tableBase";
import CreateTableData from "./component/createData";
import { useSelector, useDispatch } from "react-redux";
import { fetchProdut } from "../../redux/actions/product";
import ReactLoading from "react-loading";

const Product = () => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((state) => state.user);
  const { loading, error, listProduct } = useSelector((state) => state.product);
  const reactTableData = CreateTableData();
  useEffect(() => {
    if (!listProduct) {
      dispatch(fetchProdut(token));
    }
  }, [token, listProduct, dispatch]);
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Products</h3>
          {/* <h3 className="page-subhead subhead"></h3> */}
        </Col>
      </Row>
      <Row>
        {loading ? (
          <ReactLoading type={"bubbles"} color={"black"} />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <DataReactTable reactTableData={reactTableData} />
        )}
      </Row>
    </Container>
  );
};

export default Product;
