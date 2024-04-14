import { all, fork } from "redux-saga/effects";

//public
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import categoriesSaga from "./home/categories/saga";
import userSaga from "./home/user/saga";
import promoSaga from "./home/promo/saga";
import productSaga from "./home/product/saga";
import shippingSaga from "./home/shipping/saga";
import offersSaga from "./home/offers/saga";
import ordersSaga from "./home/orders/saga";
import dashboardSaga from './home/dashboard/saga'
import FaqSaga from './home/faq/saga'
import MessageSaga from './home/message/saga'

export default function* rootSaga() {
  yield all([
    //public
    fork(categoriesSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(userSaga),
    fork(promoSaga),
    fork(productSaga),
    fork(shippingSaga),
    fork(offersSaga),
    fork(ordersSaga),
    fork(dashboardSaga),
    fork(FaqSaga),
    fork(MessageSaga)
  ]);
}
