import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import CreateTableData from "./component/createData";
import { useSelector, useDispatch } from "react-redux";
import { fetchVendor } from "../../redux/actions/vendors";
import ReactLoading from "react-loading";

const Vendors = () => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((state) => state.user);
  const { loading, error, listVendor } = useSelector((state) => state.vendor);
  useEffect(() => {
    if (!listVendor) {
      dispatch(fetchVendor(token));
    }
  }, [dispatch, listVendor, token]);
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Vendors</h3>
        </Col>
      </Row>
      <Row>
        {loading ? (
          <ReactLoading type={"bubbles"} color={"black"} />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <CreateTableData />
        )}
      </Row>
    </Container>
  );
};

export default Vendors;
