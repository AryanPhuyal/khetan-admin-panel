import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import ActionFormater from "../../../component/alert/actionFormaterProduct";
import StatusFormatter from "../../../component/alert/statusFormater";
import { suspendVendor } from "../../../redux/actions/vendors";
import { authGet } from "../../../utility/request";
import { approveVendorApi, suspendVendorApi } from "../../../utility/api";
import { useState } from "react";

const CreateTableData = () => {
  const dispatch = useDispatch();

  const {
    user: { token },
  } = useSelector((state) => state.user);

  const unSuspend = async (vendorId) => {
    try {
      const response = await authGet(approveVendorApi(vendorId), token);
      if (response.data.success) {
        dispatch(suspendVendor(vendorId, 1));
      } else {
      }
    } catch (err) {}
  };
  const suspend = async (vendorId) => {
    try {
      const response = await authGet(suspendVendorApi(vendorId), token);
      if (response.data.success) {
        dispatch(suspendVendor(vendorId, 2));
      } else {
      }
    } catch (err) {}
  };

  const { vendors } = useSelector((state) => state.vendor);
  const [vendorList, setvendorList] = useState(vendors);

  const clickAction = (vendorId) => {
    const newVendor = [...vendors];
    const vendor = vendorList.find((e) => e._id === vendorId);
    const vendorIndex = newVendor.indexOf(vendor);
    if (vendor.accountStatus === 2) {
      suspend(vendorId);
      vendor.accountStatus = 3;
      newVendor[vendorIndex] = vendor;
      setvendorList([...newVendor]);
    } else {
      unSuspend(vendorId);
      vendor.accountStatus = 2;
      newVendor[vendorIndex] = vendor;
      setvendorList([...newVendor]);
    }
  };
  let id = 0;

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Product Count</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {vendorList.map((e) => {
          id++;

          return (
            <tr>
              <td>{id}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.profileDetails.phone}</td>
              <td>{e.profileDetails.address}</td>
              <td>{e.products.length.toString()}</td>
              <td>{StatusFormatter(e.accountStatus)}</td>
              <td>
                {ActionFormater(
                  () => clickAction(e._id),
                  `/vendors/vendor-details?vendorId=${e._id}`,
                  e.accountStatus
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CreateTableData;
