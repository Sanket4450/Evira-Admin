import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

//i18n
import { withTranslation } from 'react-i18next'

// Redux
import { useSelector, useDispatch, connect } from 'react-redux'
import { createSelector } from 'reselect'
import { Link } from 'react-router-dom'

import withRouter from '../../Common/withRouter'
import { getUserInfo } from '../../../store/actions'
import DummyImage from '../../../assets/images/dummy-image.jpeg'

const ProfileMenu = (props) => {
  const dispatch = useDispatch()
  const [menu, setMenu] = useState(false)

  const selectProfileState = (state) => state.Profile
  const ProfileProperties = createSelector(selectProfileState, (profile) => ({
    user_data: profile.user_data,
  }))

  const { user_data } = useSelector(ProfileProperties)

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user_data?.profileImage || DummyImage}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">
            {user_data?.fullName}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {' '}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t('Profile')}{' '}
          </DropdownItem>
          <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            {props.t('My Wallet')}
          </DropdownItem>
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t('Logout')}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
