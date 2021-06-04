import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  baseUrl,
  deleteMainCategoryApi,
  deleteSubCategoryApi,
  deleteChildCategoryApi,
} from "../../../utility/api";
import { Button } from "reactstrap";
import { authDelete } from "../../../utility/request";
import { deleteCategory } from "../../../redux/actions/category";

const CreateTableData = () => {
  const dispatch = useDispatch();
  const { categories, error, subCategories, childCategories } = useSelector(
    (state) => state.category
  );
  const {
    user: { token },
  } = useSelector((state) => state.user);

  const PhotoFormatter = (value) => (
    <div className="products-list__img-wrap">
      <img height="70px" width="50px" src={baseUrl + "/" + value} alt="" />
    </div>
  );
  let id = 0;

  const [config, setConfig] = useState({
    loading: false,
    error: null,
    success: null,
    categories: [...categories, ...subCategories, ...childCategories],
  });

  const deleteMain = async (categoryId) => {
    setConfig({ ...config, loading: true, error: null, success: null });
    const newCategories = [...config.categories];

    try {
      const respone = await authDelete(
        deleteMainCategoryApi(categoryId),
        token
      );
      newCategories = newCategories.filter((x) => x._id !== categoryId);
      setConfig({ ...config, categories: [...newCategories] });
      setConfig({ ...config, success: true, loading: false });
      dispatch(deleteCategory(categoryId));
    } catch (err) {
      setConfig({ ...config, error: err.toString(), loading: false });
    }
    // categories;
  };
  const deleteSub = async (categoryId) => {
    const newCategories = [...config.categories];

    setConfig({ ...config, loading: true, error: null, success: null });
    try {
      const respone = authDelete(deleteSubCategoryApi(categoryId), token);
      setConfig({ ...config, success: true, loading: false });
      newCategories = newCategories.filter((x) => x._id !== categoryId);
      setConfig({ ...config, categories: [...newCategories] });
    } catch (err) {
      setConfig({ ...config, error: err.toString(), loading: false });
      dispatch(deleteCategory(categoryId));
    }
  };
  const deleteChild = async (categoryId) => {
    const newCategories = [...config.categories];

    setConfig({ ...config, loading: true, error: null, success: null });
    try {
      const respone = await authDelete(
        deleteChildCategoryApi(categoryId),
        token
      );
      newCategories = newCategories.filter((x) => x._id !== categoryId);
      setConfig({ ...config, categories: [...newCategories] });
      setConfig({ ...config, success: true, loading: false });
    } catch (err) {
      setConfig({ ...config, error: err.toString(), loading: false });
      dispatch(deleteCategory(categoryId));
    }
  };
  if (error) {
    return <div>{error}</div>;
  }

  // console.log(config.categories);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>slug</th>
          <th>Parent Category</th>
          <th>Grand Parent Category</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {config.categories.map((e) => {
          console.log(e);
          id++;

          return (
            <tr>
              <td>{id}</td>
              <td>
                {/* {e.title} */}
                {e.title}
              </td>
              <td>{e.slug}</td>

              <td>
                {e.mainCategory
                  ? config.categories.find((x) => x._id == e.mainCategory)
                  : "______"}
              </td>
              <td>
                {e.subCategories
                  ? config.subCategories.find((x) => x.id === e.subCategories)
                  : "______"}
              </td>
              <td>{moment(e.createdAt).format("DD-MM-YYYY")}</td>
              <td>{moment(e.updatedAt).format("DD-MM-YYYY")}</td>
              <td>
                <Button
                  className="btn-danger text-light"
                  onClick={() =>
                    e.type === 1
                      ? deleteMain(e._id)
                      : e.type === 2
                      ? deleteSub(e._id)
                      : deleteChild(e._id)
                  }
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CreateTableData;
