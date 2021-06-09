import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {reducer as reduxFormReducer} from "redux-form";
import {
  sidebarReducer,
  themeReducer,
  rtlReducer,
  profileReducer,
  categoryReducer,
  productReducer,
  orderReducer,
  vendorReducer,
  usersReducer,
  enquaryReducer,
  advertismentReducer,
} from "../../redux/reducers/index";
const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  rtl: rtlReducer,
  user: profileReducer,
  category: categoryReducer,
  product: productReducer,
  order: orderReducer,
  vendor: vendorReducer,
  users: usersReducer,
  enquary: enquaryReducer,
  advertisment: advertismentReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
