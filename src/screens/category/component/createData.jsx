import { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { baseUrl } from "../../../utility/api";

const CreateTableData = () => {
  const { categories } = useSelector((state) => state.category);
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        disableGlobalFilter: true,
        width: 65,
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Slug",
        accessor: "slug",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Child Category",
        accessor: "childcategory",
      },

      // { Header: "Image", accessor: "image" },
      { Header: "CreatedAt", accessor: "createdAt" },
      { Header: "UpdatedAt", accessor: "updatedAt" },
    ],
    []
  );
  const PhotoFormatter = (value) => (
    <div className="products-list__img-wrap">
      <img height="70px" width="50px" src={baseUrl + "/" + value} alt="" />
    </div>
  );
  const data = [];
  let id = 0;
  const rows = () => {
    categories.forEach((e) => {
      data.push({
        id: id,
        title: e.title,
        slug: e.slug,
        category:
          e.type === 1
            ? "____"
            : categories.find((f) => f._id === e._id).mainCategory,
        childcategory:
          e.type === 1 || e.type === 2
            ? "_____"
            : categories.find((f) => f._id === e._id).subCategory,
        // image: PhotoFormatter(e.image),
        createdAt: moment(e.createdAt).format("DD-MM-YYYY"),
        updatedAt: moment(e.updatedAt).format("DD-MM-YYYY"),
      });
      id++;
    });
  };

  rows();
  const reactTableData = { tableHeaderData: columns, tableRowsData: data };
  return reactTableData;
};

export default CreateTableData;
