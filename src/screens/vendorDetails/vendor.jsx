import React, { useEffect, useState } from "react";
import qs from "qs";
import CreateTableData from "./product/productData";
import DataReactTable from "../../component/table/tableBase";
import { vendorDetailsApi } from "../../utility/api";
import { useSelector } from "react-redux";

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
import { authGet } from "../../utility/request";
import classnames from "classnames";

const VendorDetails = ({ location }) => {
  const {
    user: { token },
  } = useSelector((state) => state.user);

  const id = qs.parse(location.search.substring(1)).vendorId;
  const [config, setconfig] = useState({
    loading: true,
    error: null,
    success: false,
    vendor: null,
  });

  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  useEffect(async () => {
    setconfig({
      ...config,
      loading: true,
    });
    try {
      const response = await authGet(vendorDetailsApi(id), token);
      console.log(response.data.data);
      if (response.data.success) {
        setconfig({
          ...config,
          vendor: response.data.data,
          loading: false,
          success: true,
        });
      } else {
        setconfig({
          ...config,
          error: response.data.message,
          success: false,
          loading: false,
        });
      }
    } catch (err) {
      setconfig({
        ...config,
        error: err.toString(),
        success: false,
      });
    }
  }, []);
  return config.loading ? (
    <p>Loading</p>
  ) : config.error ? (
    <p>{config.error}</p>
  ) : (
    !config.loading &&
    !config.error && (
      <Container>
        <Col>
          <img
            alt="Vendor profile"
            scr="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg"
          />
        </Col>
        <Col>
          <Card></Card>
        </Col>

        <div className="tabs__wrap">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => toggle("1")}
              >
                Products
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => toggle("2")}
              >
                Suspended Products
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "3" })}
                onClick={() => toggle("3")}
              >
                Approved Products
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "4" })}
                onClick={() => toggle("4")}
              >
                Orders
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <CreateTableData data={config.vendor.products}></CreateTableData>
            </TabPane>
            <TabPane tabId="2">
              <CreateTableData
                data={config.vendor.products.filter((p) => p.status === 3)}
              ></CreateTableData>
            </TabPane>
            <TabPane tabId="3">
              <CreateTableData
                data={config.vendor.products.filter((p) => p.status === 2)}
              ></CreateTableData>
            </TabPane>
            <TabPane tabId="4">
              <p>
                Direction has strangers now believing. Respect enjoyed gay far
                exposed parlors towards. Enjoyment use tolerably dependent
                listening men. No peculiar in handsome together unlocked do by.
                Article concern joy anxious did picture sir her.
              </p>
            </TabPane>
          </TabContent>
        </div>
      </Container>
    )
  );
};

export default VendorDetails;
