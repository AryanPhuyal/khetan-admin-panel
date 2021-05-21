import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import DataReactTable from "../../component/table/tableBase";
import CreateTableData from "./component/createData";
import { useSelector, useDispatch } from "react-redux";
import { fetchVendor } from "../../redux/actions/vendors";

const Vendors = () => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((state) => state.user);
  const { loading, error, listVendor } = useSelector((state) => state.vendor);
  const reactTableData = CreateTableData();
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

export default Vendors;
