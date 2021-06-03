import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  approveProductApi,
  baseUrl,
  suspendProductApi,
} from "../../../utility/api";

import { authGet } from "../../../utility/request";
import { approveProduct } from "../../../redux/actions/product";

const CreateTableData = () => {
  const dispatch = useDispatch();
  const [actionChange, setactionChange] = useState({});

  const { enquaries } = useSelector((state) => state.enquary);
  const {
    user: { token },
  } = useSelector((state) => state.user);

  const unSuspend = async (produId) => {
    setactionChange({
      loading: true,
      prodId: produId,
    });
    try {
      const response = await authGet(approveProductApi(produId), token);
      if (response.data.success) {
        dispatch(approveProduct(produId, 1));
      } else {
        dispatch(approveProduct(produId, 2));
      }
    } catch (err) {
      dispatch(approveProduct(produId, 2));
    }
  };
  const suspend = async (produId) => {
    setactionChange({
      loading: true,
      prodId: produId,
    });
    try {
      const response = await authGet(suspendProductApi(produId), token);
      if (response.data.success) {
      } else {
      }
    } catch (err) {}
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        disableGlobalFilter: true,
        width: 65,
      },
      {
        Header: "First Name",
        accessor: "firstname",
      },
      {
        Header: "Last Name",
        accessor: "lastname",
      },
      {
        Header: "Email",
        accessor: "email",
        disableGlobalFilter: true,
      },
      {
        Header: "Contact",
        accessor: "contact",
        disableGlobalFilter: true,
        width: 70,
      },
      {
        Header: "Product",
        accessor: "product",
        disableGlobalFilter: true,
      },
      // {
      //   Header: "Product Description",
      //   accessor: "productDescription",
      //   disableGlobalFilter: true,
      // },
      {
        Header: "Enquary",
        accessor: "enquiry",
        disableGlobalFilter: true,
        // width: 50,
      },
      {
        Header: "Image",
        accessor: "image",
        disableGlobalFilter: true,
        disableSortBy: true,
      },
      {
        Header: "CreatedAt",
        accessor: "createdAt",
        disableGlobalFilter: true,
      },
    ],
    []
  );

  const PhotoFormatter = (value) => (
    <div className="products-list__img-wrap">
      <img height="70px" width="50px" src={baseUrl + "/" + value} alt="" />
    </div>
  );

  // const getImage = (img, alt) => <img src={`${baseUrl}${img}`} alt={alt} />;
  let id = 0;
  const data = [];
  const rows = () => {
    enquaries.forEach((e) => {
      data.push({
        id,
        firstname: e.firstname,
        lastname: e.lastname,
        email: e.email,
        contact: e.contact,
        product: e.enquiry,
        enquiry: e.productDescription,
        image: PhotoFormatter(e.imageLink),
        // updatedAt: moment(e.updatedAt).format("DD-MM-YYYY"),
        createdAt: moment(e.createdAt).format("DD-MM-YYYY"),
      });
      id++;
    });
  };

  rows();
  const reactTableData = { tableHeaderData: columns, tableRowsData: data };
  return reactTableData;
};

export default CreateTableData;
