import gql from 'graphql-tag'

export default gql`
  query($search: String, $entryDate: String, $status: Status) {
    visits(search: $search, entryDate: $entryDate, status: $status) {
      id
      fullName
      personId
      carPlate
      entryDate
      exitDate
      houseToVisit
      details
      goAlongWith
      status
    }
  }
`
