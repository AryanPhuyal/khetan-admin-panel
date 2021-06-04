import { Hidden } from "@material-ui/core";
import moment from "moment";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pdf from "react-to-pdf";
import {
  Container,
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
} from "reactstrap";
import {
  cancilOrder,
  completeOrder,
  declineOrder,
  orderDetails,
  refundOrder,
  shipOrder,
} from "../../redux/actions/order";
import { baseUrl } from "../../utility/api";

const OrderDetails = ({ location }) => {
  const {
    user: { token },
  } = useSelector((state) => state.user);
  const [config, setConfig] = useState({
    loading: false,
    success: false,
    order: null,
    error: null,
  });
  const id = qs.parse(location.search.substring(1)).order_id;
  const [orderStatusConf, setorderStatusConf] = useState({
    loading: false,
    success: false,
    error: null,
    status: null,
    buttons: [
      {
        title: "Declined",
        status: 2,
        showOn: [0, 3],
        class: "btn-danger",
      },
      {
        title: "Shipped",
        status: 3,
        showOn: [4, 0],
        class: "btn-primary",
      },
      {
        title: "Completed",
        status: 4,
        showOn: [3],
        class: "btn-success",
      },
      {
        title: "Refund",
        status: 5,
        showOn: [3, 4],
        class: "btn-warning",
      },
    ],
  });

  const changeOrderStatus = (status) => {
    const currentStatus = { ...config };
    currentStatus.order.status = status;
    return currentStatus;
  };
  const dispatch = useDispatch(); // api call
  useEffect(async () => {
    setConfig({
      ...config,
      loading: true,
    });
    try {
      const response = await orderDetails(token, id);
      if (response.data.success) {
        setConfig({
          ...config,
          loading: false,
          error: null,
          order: response.data.data,
        });
      } else {
        setConfig({
          ...config,
          loading: false,
          error: response.data.message,
        });
      }
    } catch (err) {
      setConfig({
        ...config,
        loading: false,
        error: err.toString(),
      });
    }
  }, []);

  const changeOrder = async (status) => {
    var response;
    try {
      setorderStatusConf({
        status,
        ...orderStatusConf,
        loading: true,
        status: status,
      });
      switch (status) {
        case 1:
          response = await cancilOrder(token, id);
          setConfig(changeOrder(1));
          dispatch(changeOrderStatus(id, 1));
          return;
        case 2:
          response = await declineOrder(token, id);
          dispatch(changeOrder(id, 2));
          setConfig(changeOrderStatus(2));

          return;
        case 3:
          response = await shipOrder(token, id);
          dispatch(changeOrder(id, 3));
          setConfig(changeOrderStatus(3));

          return;
        case 4:
          response = await completeOrder(token, id);
          dispatch(changeOrder(id, 4));
          setConfig(changeOrderStatus(4));

        case 5:
          response = await refundOrder(token, id);
          dispatch(changeOrder);
          setConfig(changeOrderStatus(5));
      }
      setorderStatusConf({
        ...orderStatusConf,
        success: true,
        status: null,
        loading: false,
      });
    } catch (err) {
      setorderStatusConf({
        ...orderStatusConf,
        success: false,
        status: null,
        error: err.toString(),
        loading: false,
      });
    }
  };
  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [9, 11],
  };
  return (
    <Container>
      <Col>
        {config.loading ? (
          <p>Loading ....</p>
        ) : config.error ? (
          <p>{config.error}</p>
        ) : (
          config.order && (
            <>
              {orderStatusConf.buttons.map((e) => {
                if (e.showOn.includes(config.order.status)) {
                  return (
                    <Button
                      onClick={() => changeOrder(e.status)}
                      disabled={
                        e.status === orderStatusConf.status &&
                        orderStatusConf.loading
                      }
                      className={e.class + " text-light"}
                    >
                      {e.status == orderStatusConf.status &&
                      orderStatusConf.loading
                        ? "Loading"
                        : e.title}
                    </Button>
                  );
                }
              })}
              <Pdf
                targetRef={ref}
                filename={`${config.order._id}.pdf`}
                options={options}
              >
                {({ toPdf }) => (
                  <Button
                    className="btn-primary text-light"
                    onClick={toPdf}
                    className="text-light btn-success"
                  >
                    {" "}
                    Download Bill
                  </Button>
                )}
              </Pdf>
              <div ref={ref}>
                <Row>
                  <Card>
                    <CardHeader>
                      <h3>Order Details</h3>
                    </CardHeader>
                    <CardBody>
                      <p>
                        Order Number:&nbsp;&nbsp;&nbsp;
                        <b>{config.order.orderId}</b>
                      </p>
                      <p>
                        Order Status:&nbsp;&nbsp;
                        <b>{config.order.status}</b>
                      </p>
                      <p>
                        Order Date:&nbsp;&nbsp;
                        <b>
                          {moment(config.order.orderedDate).format(
                            "DD-MM-YYYY  HH:MM"
                          )}
                        </b>
                      </p>
                    </CardBody>
                  </Card>
                </Row>
                <Row>
                  <Card>
                    <CardHeader>
                      <h3>Shipping Details</h3>
                    </CardHeader>
                    <CardBody>
                      <Col sm={5} lg={5} md={5}>
                        Name:&nbsp;&nbsp;&nbsp;{" "}
                        <b>{config.order.shippingAddress.name}</b>
                        <br />
                        Email:&nbsp;&nbsp;&nbsp;{" "}
                        <b>{config.order.shippingAddress.email}</b>
                        <br />
                        Phone:&nbsp;&nbsp;&nbsp;{" "}
                        <b>{config.order.shippingAddress.phone}</b>
                        <br />
                      </Col>
                      <Col sm={5} lg={5} md={5}>
                        Addres:&nbsp;&nbsp;&nbsp;{" "}
                        <b>{config.order.shippingAddress.address}</b>
                        <br />
                        Country:&nbsp;&nbsp;&nbsp;{" "}
                        <b>{config.order.shippingAddress.country}</b>
                        <br />
                        PostalCode:&nbsp;&nbsp;&nbsp;
                        <b>{config.order.shippingAddress.postalCode}</b>
                        <br />
                      </Col>
                    </CardBody>
                  </Card>
                </Row>

                <Row>
                  <Card>
                    <CardHeader>
                      <h3>Product Details</h3>
                    </CardHeader>
                    <CardBody>
                      <Table>
                        <thead>
                          <th>Product Image</th>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th>Unit Cost</th>
                          <th>Total Cost</th>
                        </thead>
                        <tbody>
                          {config.order.products.map((e) => (
                            <tr>
                              <td>
                                <img
                                  src={baseUrl + "/" + e.product.image}
                                  style={{
                                    objectFit: "cover",
                                    height: "100px",
                                    width: "100px",
                                  }}
                                />
                              </td>
                              <td>{e.product.name}</td>
                              <td>{e.quantity}</td>
                              <td>{e.unitCost}</td>
                              <td>{e.totalCost}</td>
                            </tr>
                          ))}
                          <hr
                            style={{
                              width: "100%",
                            }}
                          ></hr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total Product</td>
                            <td>
                              <b> {config.order.totalQuantity}</b>
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total Cost</td>
                            <td>
                              <b>Rs {config.order.totalCost}</b>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Row>
              </div>
            </>
          )
        )}
      </Col>
    </Container>
  );
};

export default OrderDetails;
