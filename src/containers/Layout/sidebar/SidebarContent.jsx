import React from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";
import SidebarCategory from "./SidebarCategory";

const SidebarContent = ({ onClick, changeToDark, changeToLight }) => {
  const handleHideSidebar = () => {
    onClick();
  };

  return (
    <div className="sidebar__content">
      <SidebarLink title="Dashboard" route="/" onClick={handleHideSidebar} />
      <SidebarCategory title="Category" icon="category">
        <SidebarLink
          title="List Categories"
          route="/categories/list"
          onClick={handleHideSidebar}
        />
        <SidebarLink
          title="Add Category"
          route="/categories/add"
          onClick={handleHideSidebar}
        />
      </SidebarCategory>

      <SidebarCategory title="Product" icon="product">
        <SidebarLink
          title="List product"
          route="/products/list"
          onClick={handleHideSidebar}
        />
        <SidebarLink
          title="Add Product"
          route="/products/add"
          onClick={handleHideSidebar}
        />
      </SidebarCategory>
      <SidebarLink title="Orders" route="/orders" onClick={handleHideSidebar} />
      <ul className="sidebar__block">
        <SidebarCategory title="Vendor" icon="product">
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
        </SidebarCategory>

        <SidebarLink
          title="User List"
          icon="user"
          route="/users/list"
          onClick={handleHideSidebar}
        />
        <SidebarLink
          title="Enquary List"
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
