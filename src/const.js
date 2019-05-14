export const prodHTTP = 'https://condo-be.herokuapp.com/graphql'
export const prodWebsocket = 'wss://condo-be.herokuapp.com/graphql'

export const devHTTP = 'http://localhost:4000/graphql'
export const devWebSocket = 'ws://localhost:4000/graphql'

export const isDev = process.env.NODE_ENV === 'development'

export const baseUrlHTTP = isDev ? devHTTP : prodHTTP
export const baseUrlWebSocket = isDev ? devWebSocket : prodWebsocket

export const DELETED = 'DELETED'
export const PENDING = 'PENDING'
export const REJECTED = 'REJECTED'
export const AUTHORIZED = 'AUTHORIZED'
export const ERROR = 'ERROR'
