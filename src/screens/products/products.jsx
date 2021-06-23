import React, { useEffect, useState } from "react";
// import { Col, Container, Row } from "reactstrap";
import CreateTableData from "./component/createData";
import { useSelector, useDispatch } from "react-redux";
import { fetchProdut } from "../../redux/actions/product";
import ReactLoading from "react-loading";
import classnames from "classnames";

import {
  Col,
  Container,
  Card,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
} from "reactstrap";
const Product = () => {
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((state) => state.user);
  const { loading, error, listProduct, products } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    // if (!listProduct) {
    dispatch(fetchProdut(token));
    // }
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
          <div className="tabs__wrap">
            <Nav tabs>
              <NavItem>
                <NavLink
                  style={{
                    fontSize: "1.2rem",
                    // color: activeTab === "1" ? "blue" : "black",
                  }}
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => toggle("1")}
                >
                  Products
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{
                    fontSize: "1.2rem",
                  }}
                  className={classnames({ active: activeTab === "3" })}
                  onClick={() => toggle("3")}
                >
                  Approved Products
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{
                    fontSize: "1.2rem",
                    // backgroundColor: activeTab === "2" ? "white" : "red",
                    // color: activeTab === "2" ? "blue" : "white",
                  }}
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => toggle("2")}
                >
                  Suspended Products
                </NavLink>
              </NavItem>

              <NavItem
                style={{
                  fontSize: "1.2rem",
                  // backgroundColor: activeTab === "4" ? "white" : "blue",
                  // color: activeTab === "4" ? "blue" : "white",
                }}
              >
                <NavLink
                  className={classnames({ active: activeTab === "4" })}
                  onClick={() => toggle("4")}
                >
                  Pending product
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <CreateTableData data={products}></CreateTableData>
              </TabPane>
              <TabPane tabId="2">
                <CreateTableData
                  data={products.filter((p) => p.status === 3)}
                ></CreateTableData>
              </TabPane>
              <TabPane tabId="3">
                <CreateTableData
                  data={products.filter((p) => p.status === 2)}
                ></CreateTableData>
              </TabPane>

              <TabPane tabId="4">
                <CreateTableData
                  data={products.filter((p) => p.status === 1)}
                ></CreateTableData>
              </TabPane>
              {/* <TabPane tabId="4">
              <p>
                Direction has strangers now believing. Respect enjoyed gay far
                exposed parlors towards. Enjoyment use tolerably dependent
                listening men. No peculiar in handsome together unlocked do by.
                Article concern joy anxious did picture sir her.
              </p>
            </TabPane> */}
            </TabContent>
          </div>

          // <DataReactTable reactTableData={reactTableData} />
        )}
      </Row>
    </Container>
  );
};
// <CreateTableData data={products} />;

export default Product;
