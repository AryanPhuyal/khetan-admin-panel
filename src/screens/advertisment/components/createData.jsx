import {useMemo} from "react";
import {useSelector} from "react-redux";
import moment from "moment";
import {Link} from "react-router-dom";
import ContentAdd from "material-ui/svg-icons/content/add";
import {deleteAdvertisment} from "../../../redux/actions/siteSetting";
const CreateTableData = () => {
  // const NumberFormater = (value) => <span>{value}</span>;
  const {ads} = useSelector((state) => state.advertisment);
  // console.log(ads, "what is here");
  const ActionFormatter = (val) => [
    <Link
      to={`./product_page/${val}`}
      className="btn btn-outline-primary btn-sm"
    >
      <span className="lnr lnr-eye"></span>
    </Link>,
    <Link
      to={`./product/${val}/edit`}
      className="btn btn-outline-primary btn-sm"
    >
      <span className="lnr lnr-pencil"></span>
    </Link>,
    <button
      id={val}
      className="btn btn-outline-danger btn-sm"
      onClick={(e) => deletechk(e, val)}
    >
      <span className="lnr lnr-trash"></span>
    </button>,
  ];
  const {
    user: {token},
  } = useSelector((state) => state.user);
  // console.log(ads, "some ads here to find");
  const deletechk = async (e, id) => {
    const r = window.confirm("Do you really want to Delete?");
    if (r === true) {
      const reqtem = ads.filter((ad) => ad._id === id);
      const slug = reqtem[0]._id;
      // console.log(slug, "yaha chai k aaua xaha");
      deleteAdvertisment(slug, token);
    } else {
      alert("Cancelled");
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
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Sub_Title",
        accessor: "subTitle",
      },

      {
        Header: "Button_Text",
        accessor: "buttonText",
      },
      // { Header: "Postal Code", accessor: "postalcode" },
      {Header: "Type", accessor: "type"},
      {Header: "Price", accessor: "price"},

      {
        Header: "Action",
        accessor: "action",
        disableGlobalFilter: true,
        disableSortBy: true,
        width: 110,
      },
    ],
    []
  );

  const data = [];
  let id = 1;
  const rows = () => {
    ads.forEach((e) => {
      // console.log(e.content.image, "value of e hrr");co
      data.push({
        id: id,
        image: "",
        title: e.content.title,
        subTitle: e.content.subTitle,
        buttonText: e.content.btnText,
        type: e.type,
        price: e.content.price,

        action: [ActionFormatter(e._id)],
      });
      id++;
    });
  };

  rows();
  const reactTableData = {tableHeaderData: columns, tableRowsData: data};
  return reactTableData;
};

export default CreateTableData;
