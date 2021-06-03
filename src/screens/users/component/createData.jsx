import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { baseUrl } from "../../../utility/api";
import StatusFormatter from "../../../component/alert/statusFormater";

const CreateTableData = () => {
  const { users } = useSelector((state) => state.users);

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
        Header: "First Name",
        accessor: "firstname",
      },
      {
        Header: "last Name",
        accessor: "lastname",
        disableGlobalFilter: true,
      },
      {
        Header: "Phone",
        accessor: "phone",
        disableGlobalFilter: true,
        width: 70,
      },
      {
        Header: "Address",
        accessor: "address",
        disableGlobalFilter: true,
      },
      {
        Header: "Email",
        accessor: "email",
        disableGlobalFilter: true,
      },

      {
        Header: "Status",
        accessor: "status",
        formatter: StatusFormatter,
        disableGlobalFilter: true,
        disableSortBy: true,
      },
      // {
      //   Header: "Action",
      //   accessor: "action",
      //   disableGlobalFilter: true,
      //   disableSortBy: true,
      //   width: 110,
      // },
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
      <img
        style={{
          fill: "cover",
          height: "55px",
          width: "55px",
          borderRadius: "50%",
        }}
        src={value}
        alt=""
      />
    </div>
  );

  // const getImage = (img, alt) => <img src={`${baseUrl}${img}`} alt={alt} />;
  let id = 0;
  const data = [];
  const rows = () => {
    users.forEach((e) => {
      data.push({
        id,
        firstname: e.profileDetails.firstname,
        image: PhotoFormatter(
          e.profileDetails.profilePicture
            ? baseUrl + "/" + e.profileDetails.profilePicture
            : e.profileDetails.profilePictureExternal === null
            ? "https://www.pngitem.com/pimgs/m/272-2720656_user-profile-dummy-hd-png-download.png"
            : e.profileDetails.profilePictureExternal
        ),
        lastname: e.profileDetails.lastname,
        phone: e.profileDetails.phone,
        address: e.profileDetails.address,
        email: e.email,
        status: StatusFormatter(e.accountStatus),
        // action: [ActionFormater(e._id, "ad", e.status)],
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
