module.exports = {
    ENV : process.env.NODE_ENV || 'development',
    PORT : process.env.PORT || 3000,
    URL : process.env.BASE_URL || 'http://localhost:3000',
    secret: 'secret',
    MONGODB_URL: process.env.MONGODB_URL ||
    'mongodb://papaguacha:papaguacha4773@ds213259.mlab.com:13259/photography',

}