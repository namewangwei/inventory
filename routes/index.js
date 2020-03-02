module.exports = function (app) {
    app.get('/', function (req, res) {
        return res.redirect('/signin')
    })
    app.use('/signin', require('./signin'))
    app.use('/posts/signout', require('./signout'))
    app.use('/posts', require('./posts'))
    
}