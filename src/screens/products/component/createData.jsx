import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  approveProductApi,
  baseUrl,
  suspendProductApi,
} from "../../../utility/api";
import StatusFormatter from "../../../component/alert/statusFormater";
import ActionFormater from "../../../component/alert/actionFormaterProduct";
import { authGet } from "../../../utility/request";
import { approveProduct } from "../../../redux/actions/product";

const CreateTableData = () => {
  const dispatch = useDispatch();
  const [actionChange, setactionChange] = useState({});

  const { products } = useSelector((state) => state.product);
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

  const clickAction = (produId) => {
    const product = products.find((e) => e._id === produId);
    if (product.status === 2) {
      suspend(produId);
    } else {
      unSuspend(produId);
    }
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
        Header: "Image",
        accessor: "image",
        disableGlobalFilter: true,
        disableSortBy: true,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Sku",
        accessor: "sku",
        disableGlobalFilter: true,
      },
      {
        Header: "Stock",
        accessor: "stock",
        disableGlobalFilter: true,
        width: 70,
      },
      {
        Header: "Price",
        accessor: "price",
        disableGlobalFilter: true,
      },
      {
        Header: "Vendor",
        accessor: "vendor",
        disableGlobalFilter: true,
      },
      {
        Header: "Discount",
        accessor: "discount",
        width: 50,
      },
      {
        Header: "Status",
        accessor: "status",
        formatter: StatusFormatter,
        disableGlobalFilter: true,
        disableSortBy: true,
      },
      {
        Header: "Action",
        accessor: "action",
        disableGlobalFilter: true,
        disableSortBy: true,
        width: 110,
      },
      {
        Header: "CreatedAt",
        accessor: "createdAt",
        disableGlobalFilter: true,
      },
      {
        Header: "UpdatedAt",
        accessor: "updatedAt",
        disableGlobalFilter: true,
        disableSortBy: true,
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
    products.forEach((e) => {
      data.push({
        id,
        name: e.name,
        image: PhotoFormatter(e.gallery[0]),
        sku: e.sku,
        stock: e.stock,
        price: e.price,
        vendor: e.vendor,
        status: StatusFormatter(e.status),
        action: [
          ActionFormater(
            () => clickAction(e._id),
            `/products/productDetail?prod_id=${e._id}`,
            e.status
          ),
        ],
        discount: e.discount + "%",
        updatedAt: moment(e.updatedAt).format("DD-MM-YYYY"),
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
