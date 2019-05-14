import { TextField } from '@material-ui/core'
import React from 'react'
import FilterBtn from './FilterBtn'
import { AUTHORIZED, PENDING } from '../../const'
import { DatePicker } from 'material-ui-pickers'

const Filters = ({
  handleSearch,
  handleSwitchStatus,
  handleDateChange,
  status,
  classes,
  search,
  date,
}) => {
  let picker

  const handlePicker = e => {
    picker.open(e)
  }

  return (
    <div className="pt-3 authorizedContainer d-flex align-item-start align-items-md-center flex-column flex-md-row justify-content-center">
      <div style={{ flex: 1 }}>
        <TextField
          value={search}
          fullWidth
          label="Buscar"
          margin="normal"
          variant="outlined"
          classes={{ marginNormal: classes.marginNormal }}
          onChange={e => {
            handleSearch(e.target.value)
          }}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
              input: classes.input,
            },
          }}
        />
      </div>
      <div className="px-0 px-md-5" style={{ flex: 0.5 }}>
        <div className="d-flex align-items-center pt-3 pt-md-0 justify-content-center">
          <FilterBtn
            txt="Todos"
            conditional={!status}
            onClick={handleSwitchStatus()}
            style={{
              btn: classes.searchBtn,
              active: classes.searchBtnActive,
            }}
          />
          <div className="px-2">
            <FilterBtn
              txt="Pendientes"
              conditional={status === PENDING}
              onClick={handleSwitchStatus(PENDING)}
              style={{
                btn: classes.searchBtn,
                active: classes.searchBtnActive,
              }}
            />
          </div>
          <FilterBtn
            txt="Autorizados"
            conditional={status === AUTHORIZED}
            onClick={handleSwitchStatus(AUTHORIZED)}
            style={{
              btn: classes.searchBtn,
              active: classes.searchBtnActive,
            }}
          />
        </div>
      </div>
      <div
        className="d-flex pt-4 pt-md-0 dateFilter justify-content-center justify-content-md-start"
        style={{ flex: 1 }}
      >
        <DatePicker
          value={date}
          format="dddd DD, MMMM YYYY"
          label="Fecha de entrada"
          onChange={handleDateChange}
          ref={node => {
            picker = node
          }}
          clearable
          TextFieldComponent={({ helperText, InputProps, ...props }) => (
            <TextField
              classes={{ marginNormal: classes.marginNormal }}
              {...props}
              margin="normal"
              variant="outlined"
              disabled
              onClick={handlePicker}
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              readOnly
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                  input: classes.inputDate,
                },
              }}
            />
          )}
        />
      </div>
    </div>
  )
}

export default Filters
