import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { withFormik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { compose, graphql } from 'react-apollo'
import { withHandlers, withState } from 'recompose'
import moment from 'moment'
import {
  FormControlLabel,
  Switch,
  TextField,
  withWidth,
  Checkbox,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@material-ui/core'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import { DatePicker } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'

import MaskedInput from 'react-text-mask'

import AddVisit from 'graphql/AddVisit'
import AllVisits from 'graphql/AllVisits'

import 'moment/locale/es'
import FullScreen from '../common/Modal/FullScreen'
import CancelSave from '../common/Modal/CancelSave'
import { deleteToken } from '../../push-notification'

const FormGroup = ({ children }) => <div className="form-group">{children}</div>

const InputWithValidation = ({
  field,
  form: { touched, errors },
  onClick = () => '',
  component: Component,
  ...props
}) => {
  const isError = Boolean(touched[field.name] && errors[field.name])

  return (
    <TextField
      fullWidth
      {...field}
      {...props}
      error={isError}
      margin="normal"
      variant="outlined"
      onClick={onClick}
    />
  )
}

const Input = ({ txt, name, ...props }) => (
  <FormGroup>
    <Field label={txt} name={name} component={InputWithValidation} {...props} />
  </FormGroup>
)

const DateTime = ({ setFieldValue, value, name, txt }) => {
  let picker = null

  const handlePicker = e => {
    picker.open(e)
  }

  return (
    <DatePicker
      disablePast
      value={value}
      format="dddd DD, MMMM YYYY - h:mm:ss"
      onChange={date => setFieldValue(name, date, true)}
      ref={node => {
        picker = node
      }}
      TextFieldComponent={({ helperText, InputProps, ...props }) => (
        <Input
          {...props}
          name={name}
          readOnly
          value={value}
          onClick={handlePicker}
        />
      )}
    />
  )
}

const Slide = ({ txt, defaultChecked, onClick }) => (
  <FormGroup>
    <FormControlLabel
      control={
        <Switch checked={defaultChecked} onChange={onClick} value="checkedA" />
      }
      label={txt}
    />
  </FormGroup>
)

const PersonIdTextMask = ({ inputRef, ...other }) => {
  console.log(other)
  return (
    <MaskedInput
      {...other}
      mask={[/\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
    />
  )
}

const modals = {
  xs: FullScreen,
  sm: FullScreen,
  md: CancelSave,
  lg: CancelSave,
  xl: CancelSave,
}

class VisitForm extends React.Component {
  render() {
    const {
      values: { entryDate, isAccompanied } = {},
      isAdvancedOptions,
      onAdvancedOptions,
      setFieldValue,
      onRequestClose,
      isShow,
      handleSubmit,
      width,
      onDestroyModal,
    } = this.props

    const Modal = modals[width] || 'span'

    return (
      <Modal
        onRequestClose={onRequestClose}
        isShow={isShow}
        onSubmit={handleSubmit}
        fullWidth={true}
        onDestroyModal={onDestroyModal}
        title={this.props.values.id ? 'Editar visita' : 'Agregar visita'}
      >
        <Form>
          <Input txt="Nombre" name="fullName" />
          <Input
            txt="Cédula"
            name="personId"
            InputProps={{ inputComponent: PersonIdTextMask }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isAccompanied}
                onChange={(e, checked) =>
                  setFieldValue('isAccompanied', checked)
                }
                name="isAccompanied"
                color="primary"
              />
            }
            label="¿Su visita llega con compañía?"
          />
          {isAccompanied && (
            <Input
              txt="¿Con cuántas personas llega?"
              name="goAlongWith"
              type="number"
            />
          )}
          <Slide
            defaultChecked={isAdvancedOptions}
            onClick={onAdvancedOptions}
            txt="Opciones avanzadas"
          />
          {isAdvancedOptions && (
            <Fragment>
              <Input txt="Placa del vehículo" name="carPlate" />

              <DateTime
                txt="Fecha de entrada"
                name="entryDate"
                value={moment(new Date(entryDate)).format(
                  'dddd DD, MMMM YYYY',
                  'es',
                )}
                setFieldValue={setFieldValue}
              />

              <Input
                txt="¿Hay algún detalle adicional?"
                name="details"
                multiline
                rowsMax={4}
              />
            </Fragment>
          )}
        </Form>
      </Modal>
    )
  }
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Nombre requerido'),
  personId: Yup.string()
    .required('Cédula requerida')
    .matches(/^[1-9]-\d{4}-\d{4}$/),
  carPlate: Yup.string().max(9, 'Formato no válido'),
  entryDate: Yup.string(),
  details: Yup.string(),
  isAccompanied: Yup.boolean(),
  goAlongWith: Yup.number().when('isAccompanied', {
    is: true,
    then: Yup.number()
      .required('Número de personas requerido')
      .moreThan(0, 'Número de personas requerido'),
    otherwise: Yup.number(),
  }),
})

const visitFormInitValues = {
  fullName: '',
  personId: '',
  carPlate: '',
  entryDate: new Date(),
  details: '',
  isAccompanied: false,
  goAlongWith: 0,
}

const getInitValues = ({ location }) => {
  if (location && location.state) {
    return location.state
  }

  return visitFormInitValues
}

const handleSubmit = (
  { carPlate, isAccompanied, goAlongWith, ...values },
  {
    setSubmitting,
    props: { isAdvancedOptions, mutate, history, onRequestClose },
    ...rest
  },
) => {
  const variables = {
    ...values,
    houseToVisit: 'Casa 406',
  }

  if (isAdvancedOptions) {
    variables.carPlate = carPlate
  }

  variables.goAlongWith = isAccompanied ? goAlongWith : 0

  mutate({
    variables,
    refetchQueries: [
      {
        query: AllVisits,
      },
    ],
  })

  deleteToken()
  onRequestClose()
}

const onAdvancedOptions = ({ handleAdvancedOptions }) => () =>
  handleAdvancedOptions(n => !n)

const getIsAdvancedOptions = ({ location }) => {
  const { state: { entryDate = '', carPlate = '' } = {} } = location || {}
  return !!(entryDate || carPlate)
}

const EnhancerVisitForm = compose(
  graphql(AddVisit),
  withWidth(),
  withState('isAdvancedOptions', 'handleAdvancedOptions', getIsAdvancedOptions),
  withHandlers({ onAdvancedOptions }),
  withFormik({
    mapPropsToValues: getInitValues,
    validationSchema,
    handleSubmit,
    displayName: 'VisitForm',
  }),
)(VisitForm)

export default EnhancerVisitForm
