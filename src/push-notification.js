import { initializeApp, messaging as msg } from 'firebase'

import AddNotificationToken from './graphql/AddNotificationToken'

let messaging
let client

export const updateClient = c => {
  client = c
}

export const initializeFirebase = async () => {
  initializeApp({
    messagingSenderId: '152437932286', // troque pelo seu sender id
  })

  messaging = msg()

  messaging.onTokenRefresh(function() {
    messaging
      .getToken()
      .then(function(refreshedToken) {
        console.log('Token refreshed.')
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        setTokenSentToServer(false)
        // Send Instance ID token to app server.
        sendTokenToServer(refreshedToken)
        // ...
      })
      .catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err)
        showToken('Unable to retrieve refreshed token ', err)
      })
  })

  await askForPermissioToReceiveNotifications()
}

function showToken(currentToken) {
  // Show token in console and UI.
  // var tokenElement = document.querySelector('#token')
  // tokenElement.textContent = currentToken
}

function setTokenSentToServer(sent) {
  window.localStorage.setItem('sentToServer', sent ? '1' : '0')
}

function sendTokenToServer(notificationToken) {
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...')
    client
      .mutate({
        mutation: AddNotificationToken,
        variables: { notificationToken },
      })
      .then(results => {
        //do something with result
      })
      .catch(err => {
        console.log(err)
      })
    setTokenSentToServer(true)
  } else {
    console.log(
      "Token already sent to server so won't send it again " +
        'unless it changes',
    )
  }
}

function isTokenSentToServer() {
  return window.localStorage.getItem('sentToServer') === '1'
}

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = msg()

    await messaging.requestPermission()
    const token = await messaging.getToken()
    console.log('user token: ', token)
    showToken(token)

    return token
  } catch (error) {
    showToken(error)
  }
}

export function deleteToken() {
  // Delete Instance ID token.
  // [START delete_token]
  messaging
    .getToken()
    .then(function(currentToken) {
      messaging
        .deleteToken(currentToken)
        .then(function() {
          console.log('Token deleted.')
          setTokenSentToServer(false)
          // [START_EXCLUDE]
          // Once token is deleted update UI.
          resetUI()
          // [END_EXCLUDE]
        })
        .catch(function(err) {
          console.log('Unable to delete token. ', err)
        })
      // [END delete_token]
    })
    .catch(function(err) {
      console.log('Error retrieving Instance ID token. ', err)
      showToken('Error retrieving Instance ID token. ', err)
    })
}

export function resetUI() {
  showToken('loading...')
  // [START get_token]
  // Get Instance ID token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  messaging
    .getToken()
    .then(function(currentToken) {
      console.log(currentToken)
      if (currentToken) {
        sendTokenToServer(currentToken)
        showToken(currentToken)
      } else {
        // Show permission request.
        showToken(
          'No Instance ID token available. Request permission to generate one.',
        )
        setTokenSentToServer(false)
      }
    })
    .catch(function(err) {
      console.log('An error occurred while retrieving token. ', err)
      showToken('Error retrieving Instance ID token. ', err)
      setTokenSentToServer(false)
    })
  // [END get_token]
}
