import React from "react";
import {Route, Switch} from "react-router-dom";
import Layout from "../Layout/index";
import MainWrapper from "./MainWrapper";
import LogIn from "../LogIn/index";
import {useSelector} from "react-redux";
import Products from "../../screens/products/products";
import Categories from "../../screens/category/categories";
import AddCategory from "../../screens/category/addCategory";

import Orders from "../../screens/orders/orders";
import Vendors from "../../screens/vendors/Vendors";
import AddProduct from "../../screens/addProduct";
import Users from "../../screens/users/users";
import Enquary from "../../screens/enquary/Enquary";
import Logout from "../../screens/logout/logout";
import ProductPage from "../../screens/productDescripiton";
import OrderDetails from "../../screens/ordersDetails/index.jsx";
import VendorsDetails from "../../screens/vendorDetails/vendor";
import AdsAdd from "../../screens/addAdvertisement";
import Advertisment from "../../screens/advertisment/advertisment";

const Pages = () => <Switch></Switch>;

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/" component={Pages} />
      <Route path="/products/list" component={Products} />
      <Route path="/products/add" component={AddProduct} />
      <Route path="/products/productDetail" component={ProductPage} />

      <Route path="/categories/list" component={Categories} />
      <Route path="/categories/add" component={AddCategory} />

      <Route path="/orders" exact component={Orders} />
      <Route path="/orders/order-details" component={OrderDetails} />

      <Route path="/vendors/list" component={Vendors} />
      <Route path="/vendors/vendor-details" component={VendorsDetails} />

      <Route path="/users/list" component={Users} />
      <Route path="/enquary/list" component={Enquary} />
      <Route path="/advertisment/list" component={Advertisment} />
      <Route path="/advertisment/add" component={AdsAdd} />

      <Route path="/logout" component={Logout} />
    </div>
  </div>
);

const Router = () => {
  const {loggedIn} = useSelector((state) => state.user);
  return (
    <MainWrapper>
      <main>
        <Switch>
          {!loggedIn ? (
            <Route exact path="/" component={LogIn} />
          ) : (
            <Route path="/" component={wrappedRoutes} />
          )}
        </Switch>
      </main>
    </MainWrapper>
  );
};

export default Router;
