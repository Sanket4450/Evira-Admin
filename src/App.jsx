import PropTypes from "prop-types";
import React from "react";

import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes";

// Import all middleware
import Authmiddleware from "./routes/route";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import scss
import "./assets/scss/theme.scss";

const App = () => {
  const selectLayoutState = (state) => state.Layout
  const LayoutProperties = createSelector(selectLayoutState, (layout) => ({
    layoutType: layout.layoutType,
  }))

  const { layoutType } = useSelector(LayoutProperties)

  function getLayout(layoutType) {
    let layoutCls = VerticalLayout
    switch (layoutType) {
      case 'horizontal':
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout(layoutType)

  return (
    <React.Fragment>
      <ToastContainer />
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            key={idx}
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                <Layout>{route.component}</Layout>
              </Authmiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}
        <Route path="*" element={<h1>404 Page not Found!</h1>} />
      </Routes>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
