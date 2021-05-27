import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import ActionFormater from "../../../component/alert/actionFormaterProduct";
import StatusFormatter from "../../../component/alert/statusFormater";
import { suspendVendor } from "../../../redux/actions/vendors";
import { authGet } from "../../../utility/request";
import { approveVendorApi, suspendVendorApi } from "../../../utility/api";

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
  const clickAction = (vendorId) => {
    const vendor = vendors.find((e) => e._id === vendorId);
    if (vendor.accountStatus === 2) {
      suspend(vendorId);
    } else {
      unSuspend(vendorId);
    }
  };

  // const NumberFormater = (value) => <span>{value}</span>;
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        disableGlobalFilter: true,
        width: 65,
      },
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "phone",
        accessor: "phone",
      },

      {
        Header: "Address",
        accessor: "address",
      },
      { Header: "product count", accessor: "productCount" },
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
      { Header: "Created At", accessor: "createdAt" },
    ],
    []
  );

  const data = [];
  let id = 0;
  const rows = () => {
    vendors.forEach((e) => {
      data.push({
        id: id,
        email: e.email,
        address: e.profileDetails.address,
        name: e.profileDetails.name,
        phone: e.profileDetails.phone,
        status: StatusFormatter(e.accountStatus),
        action: [
          ActionFormater(
            () => clickAction(e._id),
            `/vendors?vendorId=${e._id}`,
            e.accountStatus
          ),
        ],
        productCount: e.products.length.toString(),
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
