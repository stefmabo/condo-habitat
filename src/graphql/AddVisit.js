import gql from 'graphql-tag'

export default gql`
  mutation AddVisit(
    $id: String
    $fullName: String!
    $personId: String!
    $carPlate: String
    $entryDate: String
    $exitDate: String
    $houseToVisit: String!
    $details: String!
    $goAlongWith: Int
  ) {
    addVisit(
      id: $id
      fullName: $fullName
      personId: $personId
      carPlate: $carPlate
      entryDate: $entryDate
      exitDate: $exitDate
      houseToVisit: $houseToVisit
      details: $details
      goAlongWith: $goAlongWith
    ) {
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
