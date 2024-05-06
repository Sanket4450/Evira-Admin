import { Card, CardBody, Col, Row, Table } from 'reactstrap'

const BasicTable = ({ column, data, theadClass }) => {
  return (
    <>
      <Row>
        <Col xl={12}>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <Table className="align-middle mb-0">
                  <thead className={theadClass}>
                    <tr>
                      {column?.map((item, idx) => {
                        return (
                          <th
                            key={idx}
                            colSpan={item.colSpan}
                            style={{
                              textAlign: item?.textAlign
                                ? item?.textAlign
                                : 'unset',
                            }}
                            className={`${
                              item.enableSorting ? 'sorting sorting_desc' : ''
                            }`}
                          >
                            {item?.label}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length === 0 ? (
                      <tr>
                        <td className="text-center" colSpan={column.length}>
                          No Record Found
                        </td>
                      </tr>
                    ) : (
                      data?.map((data_item, index) => {
                        return (
                          <tr key={index}>
                            {column.map((col, colIndex) => {
                              return (
                                <td
                                  key={colIndex}
                                  style={{
                                    textAlign: col?.textAlign
                                      ? col?.textAlign
                                      : 'unset',
                                  }}
                                >
                                  {col.render
                                    ? col.render(data_item)
                                    : data_item[col.value] ?? '-'}
                                </td>
                              )
                            })}
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default BasicTable
