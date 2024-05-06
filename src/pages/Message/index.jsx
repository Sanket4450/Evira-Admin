import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import {
  Container,
} from 'reactstrap'
//redux
import { useSelector, useDispatch } from 'react-redux'

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb'

//i18n
import { withTranslation } from 'react-i18next'
import BasicCollapse from '../../components/Common/BasicCollapse'
import {
  deleteMessage,
  deleteMessageMessage,
  getMessageList,
} from '../../store/home/message/actions'
import { createSelector } from 'reselect'

import Spinners from '../../components/Common/Spinner'

import { toast } from 'react-toastify'
import Paginations from '../../components/Common/Pagination'
import DeleteModal from '../../components/Common/Model/DeleteModal'

const Message = (props) => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  })

  const [modelInfo, setModelInfo] = useState({
    deleteMessage: false,
    deleteMessageInfo: {},
  })

  document.title = 'Messages | Evira - Admin & Dashboard'
  const dispatch = useDispatch()

  const selectMessageState = (state) => state.message

  const MessageProperties = createSelector(selectMessageState, (message) => ({
    message_list: message.message_list,
    loading: message.loading,
    delete_message: message.delete_message,
    total_record: message.total_record,
  }))

  const { message_list, loading, delete_message, total_record } =
    useSelector(MessageProperties)

  useEffect(() => {
    dispatch(getMessageList(pagination))
  }, [dispatch, pagination])

  const refresh = () => {
    dispatch(getMessageList(pagination))
  }

  useEffect(() => {
    if (modelInfo?.deleteMessage) {
      toast.success(deleteMessage?.success)
      closeDeleteModel()
      refresh()
    }
  }, [delete_message?.success])

  const closeDeleteModel = () => {
    setModelInfo({
      ...modelInfo,
      deleteMessage: !modelInfo?.deleteMessage,
    })

    dispatch(
      deleteMessageMessage({
        loading: false,
        success: null,
        error: null,
      })
    )
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={props.t('Message')}
            breadcrumbItem={props.t('Message')}
          />
          {loading ? (
            <>
              <Spinners />
            </>
          ) : (
            <>
              <section style={{ marginBottom: 25 }}>
                {!message_list || message_list?.length === 0 ? (
                  <h3 className="text-center">No Record Found</h3>
                ) : (
                  <div
                    style={{
                      backgroundColor: 'var(--bs-secondary-bg)',
                      padding: '20px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--bs-light)',
                        display: 'flex',
                        padding: '13px 10px',
                        fontWeight: 'bold',
                      }}
                    >
                      <p style={{ width: '5%', margin: 0 }}></p>
                      <p style={{ width: '35%', margin: 0, padding: '0 10px' }}>
                        Email
                      </p>
                      <p style={{ width: '45%', margin: 0, padding: '0 10px' }}>
                        Title
                      </p>
                      <p
                        style={{ width: '15%', margin: 0, textAlign: 'center' }}
                      >
                        Action
                      </p>
                    </div>
                    {message_list?.map((message) => (
                      <BasicCollapse
                        key={message?.id}
                        data={message}
                        onDelete={() => {
                          setModelInfo({
                            ...modelInfo,
                            deleteMessage: !modelInfo?.deleteMessage,
                            deleteMessageInfo: message,
                          })
                        }}
                      />
                    ))}
                  </div>
                )}
              </section>
              <Paginations
                perPageData={pagination?.limit}
                data={total_record}
                currentPage={pagination?.page}
                setCurrentPage={(e) => {
                  setPagination({
                    ...pagination,
                    page: e,
                  })
                }}
                isShowingPageLength={false}
                paginationDiv="col-12"
                paginationClass="pagination pagination-rounded justify-content-center mt-2 mb-5"
              />
            </>
          )}
        </Container>
      </div>

      {/* --------------Delete Model-------------- */}
      <DeleteModal
        loading={delete_message?.loading}
        show={modelInfo?.deleteMessage}
        onCloseClick={closeDeleteModel}
        onDeleteClick={() =>
          dispatch(deleteMessage(modelInfo?.deleteMessageInfo))
        }
      />
    </React.Fragment>
  )
}

Message.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Message)
