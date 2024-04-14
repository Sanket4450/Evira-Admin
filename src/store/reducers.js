import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Profile from "./auth/profile/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import categories from "./home/categories/reducer"
import user from "./home/user/reducer"
import promo from "./home/promo/reducer"
import product from "./home/product/reducer"
import shipping from "./home/shipping/reducer"
import offers from "./home/offers/reducer"
import orders from "./home/orders/reducer"
import dashboard from './home/dashboard/reducer'
import faq from './home/faq/reducer'
import message from './home/message/reducer'

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  ForgetPassword,
  Profile,
  categories,
  user,
  promo,
  product,
  shipping,
  offers,
  orders,
  dashboard,
  faq,
  message
})

export default rootReducer;
