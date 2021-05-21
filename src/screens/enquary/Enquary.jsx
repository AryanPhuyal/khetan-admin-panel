import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import DataReactTable from "../../component/table/tableBase";
import CreateTableData from "./component/createData";
import { useSelector, useDispatch } from "react-redux";
import { fetchEnquaryList } from "../../redux/actions/enquary";

const Enquary = () => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((state) => state.user);
  const { loading, error, enquaryList } = useSelector((state) => state.enquary);
  const reactTableData = CreateTableData();
  useEffect(() => {
    if (!enquaryList) {
      dispatch(fetchEnquaryList(token));
    }
  }, [dispatch, enquaryList, token]);
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Enquary</h3>
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

export default Enquary;
