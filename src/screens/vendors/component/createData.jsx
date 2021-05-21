import { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
const CreateTableData = () => {
  // const NumberFormater = (value) => <span>{value}</span>;
  const { vendors } = useSelector((state) => state.vendor);
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
