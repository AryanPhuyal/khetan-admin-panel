import { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
const CreateTableData = () => {
  // const NumberFormater = (value) => <span>{value}</span>;
  const { orders } = useSelector((state) => state.order);
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
        Header: "Address",
        accessor: "address",
      },
      { Header: "Postal Code", accessor: "postalcode" },
      { Header: "Total Items", accessor: "totalItems" },
      { Header: "Total Quantity", accessor: "totalQuantity" },
      { Header: "Total Cost", accessor: "totalCost" },
      { Header: "User", accessor: "user" },
      { Header: "Order Date", accessor: "orderDate" },
    ],
    []
  );

  const data = [];
  let id = 0;
  const rows = () => {
    orders.forEach((e) => {
      data.push({
        id: id,
        postalcode: e.shippingAddress.postalCode.toString(),
        email: e.shippingAddress.email,
        address: e.shippingAddress.address,
        totalItems: e.totalProducts.toString(),
        name: e.shippingAddress.name,
        totalQuantity: e.totalQuantity.toString(),
        totalCost: e.totalCost.toString(),
        user: e.user,
        orderDate: moment(e.orderedData).format("DD-MM-YYYY"),
      });
      id++;
    });
  };

  rows();
  const reactTableData = { tableHeaderData: columns, tableRowsData: data };
  return reactTableData;
};

export default CreateTableData;
