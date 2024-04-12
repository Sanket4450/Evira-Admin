import React from "react";
import { Navigate } from "react-router-dom";

// Profile
import UserProfile from "../pages/Authentication/user-profile";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
import Categories from "../pages/Categories";
import User from "../pages/User";
import PromoCode from "../pages/PromoCode";
import Product from "../pages/Product";
import ProductsDetail from "../components/Products/ProductsDetail/productsDetail";
import ProductsAddForm from "../components/Products/ProductsAddForm/ProductsAddForm";
import Shipping from "../pages/Shipping";
import Orders from "../pages/Orders";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/categories", component: <Categories /> },
  { path: "/user", component: <User /> },
  { path: "/promo-code", component: <PromoCode /> },
  { path: "/product", component: <Product /> },
  { path: "/product-detail/:id", component: <ProductsDetail /> },
  { path: "/add-product", component: <ProductsAddForm /> },
  { path: "/update-product/:id", component: <ProductsAddForm /> },
  { path: "/shipping", component: <Shipping /> },
  { path: "/orders", component: <Orders /> },

  //profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: '/logout', component: <Logout /> },
  { path: '/login', component: <Login /> },
  { path: '/forgot-password', component: <ForgetPwd /> },
]

export { authProtectedRoutes, publicRoutes };
