//GLOBAL VARIABLES
const express = require('express')
const app = express()
const hdbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config')
const path = require('path')
const images = require('./routes/images')
const user = require('./routes/user')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
require('./helpers/passport') 

//CONFIG
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hdbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(session({
	secret: config.secret,
	resave:true,
	saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());



//RUTAS
app.get('/',(req,res)=>{
    res.render('home')
})

app.use('/images',images)
app.use('/user',user)

//CONECTADONDO DB Y ABRRIENDO SERVER
mongoose.connect(config.MONGODB_URL,{ useNewUrlParser: true },(err, res)=>{
	if(err)throw err
	console.log('Conexion a la base de datos establecida')
	app.listen(config.PORT,()=>{
	console.log(`Servidor corriendo en el puerto ${config.PORT}`)
	})
	})
