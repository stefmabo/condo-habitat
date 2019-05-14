import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ dataTemplate }) => (
  <div className="mb-3 d-none d-lg-block">
    <div className="d-flex flex-row card custom-card-header">
      <div className="d-flex flex-grow-1 min-width-zero">
        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
          {dataTemplate.map(({ name, tableCellHeaderClass }) => (
            <p key={name} className={tableCellHeaderClass}>
              {name}
            </p>
          ))}
        </div>
      </div>
    </div>
  </div>
)

TableHeader.propTypes = {
  dataTemplate: PropTypes.array.isRequired,
}

export default TableHeader
