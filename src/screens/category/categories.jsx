import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import DataReactTable from "../../component/table/tableBase";
import CreateTableData from "./component/createData";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategory } from "../../redux/actions/category";
const Categories = () => {
  const {
    user: { token },
  } = useSelector((state) => state.user);

  const { loading, listCategory, error } = useSelector(
    (state) => state.category
  );
  let reactTableData = CreateTableData();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory(token));
  }, []);
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Categories</h3>
          <h3 className="page-subhead subhead">List Of Categories</h3>
        </Col>
      </Row>
      <Row>
        {error ? (
          <p>{error}</p>
        ) : listCategory && !loading ? (
          <DataReactTable reactTableData={reactTableData} />
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </Container>
  );
};

export default Categories;
