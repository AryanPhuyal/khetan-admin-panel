import React, {useMemo, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import moment from "moment";
import {
  approveProductApi,
  baseUrl,
  suspendProductApi,
} from "../../../utility/api";
import StatusFormatter from "../../../component/alert/statusFormater";
import ActionFormater from "../../../component/alert/actionFormaterProduct";
import {authGet} from "../../../utility/request";
import {approveProduct} from "../../../redux/actions/product";

const PhotoFormatter = (value) => (
  <div className="products-list__img-wrap">
    <img height="70px" width="50px" src={baseUrl + "/" + value} alt="" />
  </div>
);
const CreateTableData = ({data}) => {
  const dispatch = useDispatch();
  const [actionChange, setactionChange] = useState({
    loading: false,
    prodId: null,
    products: data,
  });
  const {
    user: {token},
  } = useSelector((state) => state.user);

  const unSuspend = async (produId) => {
    try {
      const response = await authGet(approveProductApi(produId), token);
      if (response.data.success) {
        dispatch(approveProduct(produId, 1));
      } else {
      }
    } catch (err) {}
  };
  const suspend = async (produId) => {
    try {
      const response = await authGet(suspendProductApi(produId), token);
      if (response.data.success) {
        dispatch(approveProduct(produId, 2));
      } else {
      }
    } catch (err) {}
  };

  const clickAction = (produId) => {
    setactionChange({
      ...actionChange,
      loading: true,
      prodId: produId,
    });
    const newProduct = actionChange.products;
    const product = newProduct.find((e) => e._id === produId);

    if (product.status === 2) {
      product.status = 3;
      setactionChange({
        ...actionChange,
        products: newProduct,
      });
      suspend(produId);
    } else {
      product.status = 2;
      unSuspend(produId);
    }

    setactionChange({
      ...actionChange,
      loading: false,
      prodId: null,
      products: newProduct,
    });
  };
  let id = 1;
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Image</th>
          <th>Sku</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Status</th>
          <th>Action</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {actionChange.products.map((e) => {
          return (
            <tr key={e._id}>
              <td>{id}</td>
              <td style={{textAlign: "start"}}>{e.name}</td>
              <td>{PhotoFormatter(e.gallery[0])}</td>
              <td>{e.sku}</td>
              <td>{e.stock}</td>
              <td>{e.price}</td>
              <td>{e.discount}</td>
              <td>{StatusFormatter(e.status)}</td>
              <td>
                {actionChange.prodId === e._id
                  ? "Loading..."
                  : ActionFormater(
                      () => clickAction(e._id),
                      `/products/productDetail/?id=${e._id}`,
                      e.status
                    )}
              </td>
              <td>{moment(e.createAt).format("DD-MM-YYYY")}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CreateTableData;
