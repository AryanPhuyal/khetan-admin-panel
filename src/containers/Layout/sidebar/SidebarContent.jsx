import React from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";
import SidebarCategory from "./SidebarCategory";

const SidebarContent = ({
  onClick,
  changeToDark,
  changeToLight,
  sidebarCollapse,
  sidebarsubCollapse,
}) => {
  const handleHideSidebar = () => {
    onClick();
  };

  return (
    <div className="sidebar__content">
      <SidebarLink title="Dashboard" route="/" onClick={handleHideSidebar} />
      {/* <SidebarCategory title="Category" icon="category"> */}
      <SidebarLink
        title="Categories"
        route="/categories/list"
        onClick={handleHideSidebar}
      />
      {/* <SidebarLink
          title="Add Category"
          route="/categories/add"
          onClick={handleHideSidebar}
        /> */}
      {/* </SidebarCategory> */}

      {/* <SidebarCategory title="Product" icon="product"> */}
      <SidebarLink
        title="Products"
        route="/products/list"
        onClick={handleHideSidebar}
      />
      {/* <SidebarLink
          title="Add Product"
          route="/products/add"
          onClick={handleHideSidebar}
        /> */}
      {/* </SidebarCategory> */}
      <SidebarLink title="Orders" route="/orders" onClick={handleHideSidebar} />
      <ul className="sidebar__block">
        {/* <SidebarCategory title="Vendor" icon="product"> */}
        <SidebarLink
          title="List Vendor"
          route="/vendors/list"
          onClick={handleHideSidebar}
        />
        {/* <SidebarLink
          title="Add Product"
          route="/products/add"
          onClick={handleHideSidebar}
        /> */}
        {/* </SidebarCategory> */}

        <SidebarLink
          title="Users"
          icon="user"
          route="/users/list"
          onClick={handleHideSidebar}
        />
        <SidebarLink
          title="Enquarys"
          icon="exit"
          route="/enquary/list"
          onClick={handleHideSidebar}
        />
        {/* <SidebarLink
          title="Log In"
          icon="exit"
          route="/log_in"
          onClick={handleHideSidebar}
        /> */}
        <SidebarCategory
          title="Manage Site"
          icon="file"
          sidebarCollapse={sidebarCollapse}
        >
          <SidebarLink
            title="Add Ads"
            route="/advertisment/add"
            onClick={handleHideSidebar}
          />
          {/* <SidebarLink title="Single Product" route="/e-commerce/product_page" onClick={hideSidebar} /> */}
          <SidebarLink
            title="Advertisment"
            route="/advertisment/list"
            onClick={handleHideSidebar}
          />
        </SidebarCategory>
        <SidebarCategory title="Layout" icon="layers">
          <button
            type="button"
            className="sidebar__link"
            onClick={changeToLight}
          >
            <p className="sidebar__link-title">Light Theme</p>
          </button>
          <button
            type="button"
            className="sidebar__link"
            onClick={changeToDark}
          >
            <p className="sidebar__link-title">Dark Theme</p>
          </button>
        </SidebarCategory>
      </ul>
    </div>
  );
};

SidebarContent.propTypes = {
  changeToDark: PropTypes.func.isRequired,
  changeToLight: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SidebarContent;
