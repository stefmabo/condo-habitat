const styles = theme => {
  const mainColor = theme.palette.primary.main
  return {
    cssLabel: {
      color: '#808080',
      '&$cssFocused': {
        color: mainColor,
      },
    },
    cssFocused: {},
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        borderColor: '#FFF',
      },
    },
    notchedOutline: {
      borderColor: '#808080 !important',
    },
    inputDate: {
      color: '#808080',
      cursor: 'pointer',
    },
    input: {
      color: '#808080',
    },
    searchBtn: {
      borderColor: '#808080',
      border: '1px solid',
      backgroundColor: 'transparent',
      color: '#808080',
      textTransform: 'capitalize',
    },
    searchBtnActive: {
      borderColor: '#808080',
      border: '1px solid',
      backgroundColor: mainColor,
      color: '#FFF',
      textTransform: 'capitalize',
      '&:hover': {
        borderColor: '#808080',
        border: '1px solid',
        backgroundColor: mainColor,
        color: '#FFF',
      },
      '&:active': {
        borderColor: '#808080',
        border: '1px solid',
        backgroundColor: mainColor,
        color: '#FFF',
      },
      '&:focus': {
        borderColor: '#808080',
        border: '1px solid',
        backgroundColor: mainColor,
        color: '#FFF',
      },
    },
    marginNormal: {
      margin: 0,
    },
    dateLegend: {
      transition: 'none !important',
    },
  }
}

export default styles
