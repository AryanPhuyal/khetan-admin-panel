import { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { baseUrl } from "../../../utility/api";

const CreateTableData = () => {
  const { categories } = useSelector((state) => state.category);

  const PhotoFormatter = (value) => (
    <div className="products-list__img-wrap">
      <img height="70px" width="50px" src={baseUrl + "/" + value} alt="" />
    </div>
  );
  let id = 0;

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>slug</th>
          <th>category</th>
          <th>sub category</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((e) => {
          id++;

          return (
            <tr>
              <td>{id}</td>
              <td>
                {e.type === 1
                  ? e.title
                  : e.type == 2
                  ? categories.find((f) => f.mainCategory === e.id).title
                  : e.title}
              </td>
              <td>{e.slug}</td>
              <td>
                {e.type === 1
                  ? "____"
                  : e.type == 2
                  ? categories.find((f) => f.mainCategory === e.id).title
                  : e.title}
              </td>
              <td>
                {e.type === 1 || e.type === 2
                  ? "_____"
                  : categories.find((f) => f.subCategories === e.id).title}
              </td>
              <td>{moment(e.createdAt).format("DD-MM-YYYY")}</td>
              <td>{moment(e.updatedAt).format("DD-MM-YYYY")}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CreateTableData;
