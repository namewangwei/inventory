module.exports = {
    port: 8089,
    session: {
      secret: 'myblog',
      key: 'myblog',
      maxAge: 2592000000
    },
    mongodb: 'mongodb://127.0.0.1:27017/db'
  }