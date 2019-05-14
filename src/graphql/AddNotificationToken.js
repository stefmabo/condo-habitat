import gql from 'graphql-tag'

export default gql`
  mutation AddNotificationToken($notificationToken: String) {
    addNotificationToken(notificationToken: $notificationToken)
  }
`
