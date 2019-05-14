import gql from 'graphql-tag'

export default gql`
  subscription visitAuthorized {
    visitAuthorized {
      id
      fullName
      personId
      carPlate
      entryDate
      exitDate
      houseToVisit
      status
      details
    }
  }
`
