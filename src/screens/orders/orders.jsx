import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import DataReactTable from "../../component/table/tableBase";
import CreateTableData from "./component/createData";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrder } from "../../redux/actions/order";

const Orders = () => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((state) => state.user);
  const { loading, error, listOrder } = useSelector((state) => state.order);
  const reactTableData = CreateTableData();
  useEffect(() => {
    if (!listOrder) {
      dispatch(fetchOrder(token));
    }
  }, [dispatch, listOrder, token]);
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Orders</h3>
          {/* <h3 className="page-subhead subhead"></h3> */}
        </Col>
      </Row>
      <Row>
        {loading ? (
          <p>loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <DataReactTable reactTableData={reactTableData} />
        )}
      </Row>
    </Container>
  );
};

export default Orders;
