import { useState } from 'react'
import { Collapse, Button, CardBody, Card } from 'reactstrap'

function BasicCollapse({ data, onDelete }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 10px',
          borderBottom: '1px solid var(--bs-light)',
        }}
      >
        <div
          style={{
            width: '5%',
            margin: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <span
            color="secondary"
            style={{ cursor: 'pointer', padding: '0 2px' }}
            onClick={toggle}
          >
            {isOpen ? '-' : '+'}
          </span>
        </div>
        <p
          style={{
            width: '35%',
            margin: 0,
            padding: '0 10px',
            overflow: 'auto',
          }}
        >
          {data.email}
        </p>
        <p style={{ width: '45%', margin: 0, padding: '0 10px' }}>
          {data.title}
        </p>
        <div
          style={{
            width: '15%',
            margin: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <i
            className="mdi mdi-delete font-size-20 text-danger"
            style={{ cursor: 'pointer' }}
            onClick={onDelete}
          />
        </div>
      </div>
      <Collapse isOpen={isOpen}>
        <Card style={{ margin: 0, padding: '0 5%' }}>
          <CardBody>{data.description}</CardBody>
        </Card>
      </Collapse>
    </>
  )
}

export default BasicCollapse
