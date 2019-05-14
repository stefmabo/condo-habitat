import gql from 'graphql-tag'

export default gql`
  mutation DeleteVisit($id: String) {
    deleteVisit(id: $id) {
      id
      fullName
      personId
      carPlate
      entryDate
      exitDate
      houseToVisit
      status
      details
      goAlongWith
    }
  }
`
