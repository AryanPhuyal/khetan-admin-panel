import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import DataReactTable from "../../component/table/tableBase";
import CreateTableData from "./component/createData";
import { useSelector, useDispatch } from "react-redux";
import { addSubCategory, fetchCategory } from "../../redux/actions/category";
import ReactLoading from "react-loading";
import ModalContent from "../../shared/modal/ModalContent";
import AddMainCategory from "./component/addMainCategory";
import AddSubCategory from "./component/addSubCategory";
import AddChildCategory from "./component/addChildCategory";

const Categories = () => {
  const {
    user: { token },
  } = useSelector((state) => state.user);

  const { loading, listCategory, error } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory(token));
  }, [dispatch, token]);
  return (
    <Container>
      <Col></Col>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Categories</h3>

          <h3 className="page-subhead subhead">List Of Categories</h3>
          <ModalContent
            btn="Add Main Category "
            btnClass="btn-success  text-light"
          >
            <AddMainCategory />
          </ModalContent>
          <ModalContent
            btn="Add Sub Category "
            btnClass="btn-success  text-light"
          >
            <AddSubCategory />
          </ModalContent>
          <ModalContent
            btn="Add Child Category "
            btnClass="btn-success  text-light"
          >
            <AddChildCategory />
          </ModalContent>
        </Col>
      </Row>
      <Row>
        {error ? (
          <p>{error}</p>
        ) : listCategory && !loading ? (
          <CreateTableData />
        ) : (
          // <DataReactTable reactTableData={reactTableData} />
          <ReactLoading type={"bubbles"} color={"black"} />
        )}
      </Row>
    </Container>
  );
};

export default Categories;
