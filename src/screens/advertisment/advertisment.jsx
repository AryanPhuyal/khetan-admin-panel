import React, {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import DataReactTable from "../../component/table/tableBase";
import CreateTableData from "./components/createData";
import {useSelector, useDispatch} from "react-redux";
import {fatchAdvertisment} from "../../redux/actions/siteSetting";

import ReactLoading from "react-loading";

const Advertisment = () => {
  const reactTableData = CreateTableData();
  const dispatch = useDispatch();
  const {
    user: {token},
  } = useSelector((state) => state.user);
  const {loading, error, success} = useSelector((state) => state.advertisment);

  useEffect(() => {
    if (!success) {
      dispatch(fatchAdvertisment(token));
    }
  }, [dispatch, success, token]);
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Advertisment</h3>
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

export default Advertisment;
