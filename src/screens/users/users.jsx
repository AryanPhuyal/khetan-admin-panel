import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import DataReactTable from "../../component/table/tableBase";
import CreateTableData from "./component/createData";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/actions/users";
import ReactLoading from "react-loading";

const Users = () => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((state) => state.user);
  const { loading, error, listUsers } = useSelector((state) => state.users);
  const reactTableData = CreateTableData();
  useEffect(() => {
    if (!listUsers) {
      dispatch(fetchUsers(token));
    }
  }, [listUsers, token, dispatch]);
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Users</h3>
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

export default Users;
