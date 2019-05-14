import React from 'react'

const AddNewVisit = ({ goToVisitForm }) => (
  <div className="card-container position-relative">
    <div
      className="card card-add-new mx-0 mx-sm-2"
      onClick={goToVisitForm(null)}
    >
      <div className="card-body d-flex flex-column align-items-center justify-content-center">
        <div className="px-4">
          <i
            style={{ fontSize: '2em' }}
            className="material-icons color-primary"
          >
            add
          </i>
        </div>
        <div className="color-grey">
          <b className="fa-5x">
            <h6>Agregar nueva visita</h6>
          </b>
        </div>
      </div>
    </div>
  </div>
)

export default AddNewVisit
