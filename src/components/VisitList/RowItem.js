import React from 'react'
import { string, bool, func } from 'prop-types'
import moment from 'moment'

import IconNextTo from '../common/IconNextTo'
import { AUTHORIZED } from '../../const'

const RowItem = props => {
  const { id, goToVisitForm, showDeleteModal, ...data } = props
  return (
    <div className="card-container position-relative">
      <div className="card mx-0 mx-sm-2" onClick={goToVisitForm(props)}>
        <div className="card-body">
          <div className="color-grey pb-2">
            <b>{data.fullName}</b>
          </div>
          <div className="d-flex">
            <IconNextTo
              icon="credit_card"
              txt={data.personId}
              iconClassName="color-primary"
              txtClassName="main-txt-color"
            />
            {data.carPlate && (
              <IconNextTo
                icon="directions_car"
                txt={data.carPlate}
                iconClassName="color-primary pt-1"
                containerClassName="pl-5"
                txtClassName="txt-car-plate-padding-top main-txt-color"
              />
            )}
          </div>
          <IconNextTo
            icon="date_range"
            txt={moment(new Date(data.entryDate)).format('dddd DD, MMMM YYYY')}
            containerClassName="pt-1"
            iconClassName="color-primary"
            txtClassName="main-txt-color"
          />
          <div className="d-flex align-items-center pt-1">
            <svg
              className={`svg-circle ${
                data.status === AUTHORIZED ? 'color-success' : 'color-warning'
              }`}
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="presentation"
            >
              <circle cx="12" cy="12" r="12" />
              <text className="j1nyxyn4" x="12" y="16" textAnchor="middle">
                1
              </text>
            </svg>
            <span className="pl-2 main-txt-color">
              {data.status === AUTHORIZED ? 'Autorizado' : 'Pendiente'}
            </span>
          </div>
        </div>
      </div>
      <div
        className="position-absolute delete-container"
        onClick={showDeleteModal({ id, fullName: data.fullName })}
      >
        <i className="material-icons color-grey">delete</i>
      </div>
    </div>
  )
}

RowItem.propTypes = {
  fullName: string.isRequired,
  personId: string.isRequired,
  carPlate: string,
  entryDate: string.isRequired,
  status: string.isRequired,
  goToVisitForm: func.isRequired,
}

export default RowItem
