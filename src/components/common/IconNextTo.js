import React from 'react'
import PropTypes from 'prop-types'

const IconNextTo = ({
  icon,
  txt,
  containerClassName,
  iconClassName,
  txtClassName,
}) => {
  return (
    <div className={`d-flex align-items-center pb-1 ${containerClassName}`}>
      <i className={`material-icons pr-1 ${iconClassName}`}>{icon}</i>
      <div className={txtClassName}>{txt}</div>
    </div>
  )
}

IconNextTo.propTypes = {
  icon: PropTypes.string.isRequired,
  txt: PropTypes.string,
  containerClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  txtClassName: PropTypes.string,
}

IconNextTo.defaultProptypes = {
  txt: 'It works',
}

export default IconNextTo
