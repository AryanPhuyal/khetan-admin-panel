import React, { useEffect } from "react";
import { Col, Container, Row, Card, CardBody, CardHeader } from "reactstrap";
import CreateTableData from "./component/createData";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategory } from "../../redux/actions/category";
import AddMainCategory from "./component/addMainCategory";
import AddSubCategory from "./component/addSubCategory";
import AddChildCategory from "./component/addChildCategory";
const AddCategorie = () => {
  const {
    user: { token },
  } = useSelector((state) => state.user);

  const { loading, listCategory, error } = useSelector(
    (state) => state.category
  );
  let reactTableData = CreateTableData();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!listCategory) dispatch(fetchCategory(token));
  }, []);
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Add Categories</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <h3 className="page-subhead subhead">Add Main Category</h3>
            <CardBody>
              <AddMainCategory />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            {/* <CardHeader> */}
            <h3 className="page-subhead subhead">Add Sub Category</h3>
            {/* </CardHeader> */}

            <CardBody>
              <AddSubCategory />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            {/* <CardHeader> */}
            <h3 className="page-subhead subhead">Add Child Category</h3>
            {/* </CardHeader> */}

            <CardBody>
              <AddChildCategory />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCategorie;
