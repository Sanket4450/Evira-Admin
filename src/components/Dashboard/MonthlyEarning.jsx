import React from 'react'

import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap'

import ApexRadial from './ApexRadial'

const MonthlyEarning = ({ title, data, label }) => {
  return (
    <React.Fragment>
      {' '}
      <Card>
        <CardBody>
          <CardTitle className="mb-4">{title}</CardTitle>
          <Row>
            <Col sm="6">
              <p className="text-muted">This month</p>
              <h3>
                {data?.Symbol}
                {data?.count}
              </h3>
              <p className="text-muted">
                <span
                  className={`${
                    data?.percentage < 0 ? 'text-danger' : 'text-success'
                  } me-2`}
                >
                  {' '}
                  {data?.percentage}%{' '}
                  <i
                    className={`mdi ${
                      data?.percentage < 0 ? 'mdi-arrow-down' : 'mdi-arrow-up'
                    }`}
                  ></i>{' '}
                </span>{' '}
                From previous period
              </p>
            </Col>
            {data?.count > 0 && (
              <Col sm="6">
                <div className="mt-4 mt-sm-0">
                  <ApexRadial
                    dataColors='["--bs-primary"]'
                    data={data}
                    label={label}
                  />
                </div>
              </Col>
            )}
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default MonthlyEarning
